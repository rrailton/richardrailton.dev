export const personal = {
  name: "Richard Railton",
  title: "Data Analytics & Data Science",
  location: "San Francisco Bay Area",
  bio: "Analytics engineer specializing in building scalable, production-grade data products with dbt. Combines analytical depth with engineering rigor to design reliable data architectures, automated observability, and self-service reporting that drive revenue growth and product innovation.",
  email: "data@richardrailton.dev",
  linkedin: "https://www.linkedin.com/in/rrailton/",
  github: "https://github.com/rrailton",
  photo: "/profile.jpg",
};

export const experience = [
  {
    title: "Senior Data Analyst",
    company: "Anatomy Financial",
    location: "San Mateo, CA",
    start: "Jan 2025",
    end: "Present",
    bullets: [
      "Led the end-to-end data analytics lifecycle, from data architecture and pipeline development to modeling and reporting, to inform product strategy and business decisions",
      "Drove a 7% increase in revenue by developing a new billing model that identified and corrected inaccuracies in existing logic",
      "Improved product reliability by creating observability models and automated alerting systems that proactively identify document pipeline issues, leading to a significant reduction in troubleshooting time",
      "Designed and implemented a scalable dbt Core project from the ground up, delivering trusted, well-tested data products that power automated enterprise reporting and support rapid product and customer growth",
    ],
  },
  {
    title: "Data Analyst III",
    company: "Maven Clinic",
    location: "New York, NY",
    start: "Jan 2023",
    end: "Nov 2024",
    bullets: [
      "Influenced product roadmap and contributed to millions of dollars in prospective annual bookings by providing data-driven insights on employee/clinic coverage and geographic analysis",
      "Utilized K-means clustering in Python to identify optimal provider locations, directly supporting successful contract negotiations for one of Maven's largest clients",
      "Scaled automated reporting for thousands of clients by building new data models, consolidating metrics, and implementing comprehensive testing in dbt",
      "Increased revenue by overhauling the logic for enrollment verification, which captured 3x more errors and reduced lost revenue",
    ],
  },
  {
    title: "Data Analyst",
    company: "Costa Express",
    location: "Loudwater, England",
    start: "May 2017",
    end: "Aug 2021",
    bullets: [
      "Reduced operational downtime by up to 60% through in-depth analysis of alarm data, providing actionable insights for operators",
      "Supported experimental promotions by identifying control groups and analyzing the impact on sales to inform future marketing campaigns",
      "Developed and implemented new marketing metrics and reporting to track campaign performance, improving campaign management and visibility",
      "Led the development of a bespoke reporting platform, from business case and requirements gathering to user acceptance testing and training",
    ],
  },
];

export const education = [
  {
    credential: "Advanced dbt Certification",
    institution: "Uplimit",
    year: "2024",
  },
  {
    credential: "Data Science and Data Analytics Certificate with Honors",
    institution: "UCSC Silicon Valley Extension",
    year: "2022",
  },
  {
    credential: "Python, Statistics & Calculus",
    institution: "UC Berkeley Extension",
    year: "2021",
  },
  {
    credential: "Economics and Geography, Master of Arts with Honors",
    institution: "University of Aberdeen",
    year: "2013",
  },
];

export const projects = [
  {
    title: "Divvy Bikeshare Analysis",
    description:
      "Interactive Power BI report analyzing Divvy bikeshare usage patterns across Chicago.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiMzBkYWRkY2ItZmE2OS00YmJiLWJmM2QtYmIwODE0MTJhYTE5IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    title: "GitHub",
    description: "Open source projects and data analysis work.",
    url: "https://github.com/rrailton",
  },
];

// Skill proficiency: 1-10 scale
// Based on resume: SQL & dbt are primary tools, Python secondary, strong BI, solid data engineering
export const skills = {
  labels: [
    "SQL",
    "Python",
    "dbt / Data Modeling",
    "BI & Visualization",
    "Data Engineering",
    "Statistical Analysis",
    "R",
  ],
  values: [9, 7, 9, 8, 7, 6, 4],
};
