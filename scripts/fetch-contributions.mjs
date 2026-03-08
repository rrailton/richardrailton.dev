import { execSync } from "child_process";
import { writeFileSync, mkdirSync } from "fs";

const username = "rrailton";

const query = `
  query {
    user(login: "${username}") {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
              color
            }
          }
        }
      }
    }
  }
`;

let result;

if (process.env.GITHUB_TOKEN) {
  // CI: use the token from environment (GitHub Actions)
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  result = await res.json();
} else {
  // Local: use gh cli auth
  const raw = execSync(`gh api graphql -f query='${query.replace(/'/g, "'\\''")}'`, {
    encoding: "utf-8",
  });
  result = JSON.parse(raw);
}

if (result.errors) {
  console.error("GraphQL errors:", JSON.stringify(result.errors, null, 2));
  process.exit(1);
}

const calendar =
  result.data.user.contributionsCollection.contributionCalendar;

mkdirSync("src/data", { recursive: true });
writeFileSync("src/data/contributions.json", JSON.stringify(calendar, null, 2));
console.log(`Fetched ${calendar.totalContributions} contributions`);
