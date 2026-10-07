// Builds a baseline git ref and the working tree, screenshots every page of
// both in headless Chromium, and reports pixel differences.
//
//   npm run visual-diff            # baseline: origin/main
//   npm run visual-diff -- <ref>   # baseline: any commit, branch or tag
//
// Screenshots and diff masks are written to .visual-diff/.
import { execFileSync } from "child_process";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from "fs";
import { createServer } from "http";
import { tmpdir } from "os";
import { extname, join } from "path";
import { chromium } from "playwright";
import sharp from "sharp";

const baselineRef = process.argv[2] ?? "origin/main";
const widths = [1280, 390];
const schemes = ["light", "dark"];
// Per-channel difference below which two pixels count as the same colour.
const tolerance = 3;
const outDir = ".visual-diff";
const dataFile = "src/data/contributions.json";

const mimeTypes = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
  ".woff2": "font/woff2",
};

function run(cmd, args, cwd = ".") {
  try {
    return execFileSync(cmd, args, { cwd, encoding: "utf-8", stdio: "pipe" });
  } catch (err) {
    console.error(`${cmd} ${args.join(" ")} failed in ${cwd}\n${err.stdout ?? ""}${err.stderr ?? ""}`);
    throw err;
  }
}

function build(cwd) {
  run("npm", ["run", "build"], cwd);
  return join(cwd, "dist");
}

function serve(root) {
  const server = createServer((req, res) => {
    let file = join(root, decodeURIComponent(new URL(req.url, "http://localhost").pathname));
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, "index.html");
    if (!existsSync(file)) {
      res.writeHead(404).end();
      return;
    }
    res.writeHead(200, { "Content-Type": mimeTypes[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  });
  return new Promise((resolve) => server.listen(0, () => resolve(server)));
}

function routes(dist) {
  return readdirSync(dist, { recursive: true })
    .filter((file) => file.endsWith("index.html"))
    .map((file) => "/" + file.slice(0, -"index.html".length))
    .sort();
}

async function compare(nameA, nameB, key) {
  const a = sharp(nameA).removeAlpha();
  const b = sharp(nameB).removeAlpha();
  const [metaA, metaB] = [await a.metadata(), await b.metadata()];
  if (metaA.width !== metaB.width || metaA.height !== metaB.height) {
    return `size ${metaA.width}x${metaA.height} → ${metaB.width}x${metaB.height}`;
  }
  const [rawA, rawB] = await Promise.all([a.raw().toBuffer(), b.raw().toBuffer()]);
  const mask = Buffer.alloc(metaA.width * metaA.height);
  let changed = 0;
  let firstRow = -1;
  let lastRow = -1;
  for (let i = 0; i < rawA.length; i += 3) {
    const delta = Math.max(
      Math.abs(rawA[i] - rawB[i]),
      Math.abs(rawA[i + 1] - rawB[i + 1]),
      Math.abs(rawA[i + 2] - rawB[i + 2]),
    );
    if (delta > tolerance) {
      changed++;
      mask[i / 3] = 255;
      lastRow = Math.floor(i / 3 / metaA.width);
      if (firstRow < 0) firstRow = lastRow;
    }
  }
  if (!changed) return null;
  await sharp(mask, { raw: { width: metaA.width, height: metaA.height, channels: 1 } })
    .png()
    .toFile(join(outDir, `${key}.diff.png`));
  const percent = ((100 * changed) / mask.length).toFixed(3);
  return `${changed} px (${percent}%), rows ${firstRow}-${lastRow}`;
}

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

// Both builds must render the same contributions data.
if (!existsSync(dataFile)) run("node", ["scripts/fetch-contributions.mjs"]);

const sha = run("git", ["rev-parse", "--short", baselineRef]).trim();
const worktree = mkdtempSync(join(tmpdir(), "visual-diff-"));
const servers = [];
let browser;
let differences = 0;

try {
  console.log(`Building baseline ${baselineRef} (${sha})...`);
  run("git", ["worktree", "add", "--detach", worktree, baselineRef]);
  run("npm", ["ci"], worktree);
  run("npm", ["rebuild", "sharp"], worktree);
  mkdirSync(join(worktree, "src/data"), { recursive: true });
  copyFileSync(dataFile, join(worktree, dataFile));
  const baselineDist = build(worktree);

  console.log("Building working tree...");
  const currentDist = build(".");

  const dists = { baseline: baselineDist, current: currentDist };
  const origins = {};
  for (const [name, dist] of Object.entries(dists)) {
    const server = await serve(dist);
    servers.push(server);
    origins[name] = `http://localhost:${server.address().port}`;
  }

  const baselineRoutes = routes(baselineDist);
  const currentRoutes = routes(currentDist);
  for (const route of new Set([...baselineRoutes, ...currentRoutes])) {
    if (!baselineRoutes.includes(route)) console.log(`  new page, not compared: ${route}`);
    if (!currentRoutes.includes(route)) console.log(`  removed page, not compared: ${route}`);
  }

  browser = await chromium.launch();
  for (const route of currentRoutes.filter((r) => baselineRoutes.includes(r))) {
    for (const scheme of schemes) {
      for (const width of widths) {
        const slug = route === "/" ? "home" : route.replace(/^\/|\/$/g, "").replaceAll("/", "_");
        const key = `${slug}-${scheme}-${width}`;
        for (const [name, origin] of Object.entries(origins)) {
          const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme: scheme });
          const page = await context.newPage();
          page.on("response", (response) => {
            if (response.status() >= 400) console.log(`  ${name}: ${response.status()} ${response.url()}`);
          });
          await page.goto(origin + route, { waitUntil: "networkidle" });
          await page.evaluate(() => document.fonts.ready);
          await page.screenshot({ path: join(outDir, `${key}.${name}.png`), fullPage: true, animations: "disabled" });
          await context.close();
        }
        const result = await compare(join(outDir, `${key}.baseline.png`), join(outDir, `${key}.current.png`), key);
        if (result) differences++;
        console.log(`  ${result ? "✗" : "✓"} ${key.padEnd(40)} ${result ?? "identical"}`);
      }
    }
  }
} finally {
  await browser?.close();
  for (const server of servers) server.close();
  try {
    run("git", ["worktree", "remove", "--force", worktree]);
  } catch {
    rmSync(worktree, { recursive: true, force: true });
    run("git", ["worktree", "prune"]);
  }
}

console.log(
  differences
    ? `\n${differences} screenshot(s) differ from ${baselineRef}. See ${outDir}/ for baseline, current and diff images.`
    : `\nNo visual differences from ${baselineRef}.`,
);
process.exit(differences ? 1 : 0);
