export const personal = {
  name: "Richard Railton",
  location: "San Francisco Bay Area",
  bio: "Analytics Engineer specializing in building scalable, production-grade data products with dbt. Combines analytical depth with engineering rigor to design reliable data architectures, automated observability, and self-service reporting that drive revenue growth and product innovation.",
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
    slug: "divvy-bikeshare",
    title: "Divvy Bikeshare Analysis",
    description:
      "Interactive Power BI dashboard analyzing Divvy bikeshare usage patterns across Chicago.",
    body: "An interactive Power BI dashboard built as part of the Data Science and Data Analytics certificate program at UCSC Extension. Analyzes 12 months of Divvy bikeshare trip data to uncover usage patterns between casual riders and annual members — including trip duration, popular routes, and seasonal trends. The analysis informed a set of marketing recommendations to convert casual riders to members.",
    url: "https://app.powerbi.com/view?r=eyJrIjoiMzBkYWRkY2ItZmE2OS00YmJiLWJmM2QtYmIwODE0MTJhYTE5IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
    linkLabel: "View Dashboard",
  },
  {
    slug: "predicting-road-accident-severity",
    title: "Predicting Road Accident Severity",
    description:
      "Machine learning group project in Python predicting accident severity with KNN, Random Forest, SVM, and XGBoost.",
    external: true,
    url: "https://github.com/rrailton/predicting-road-accident-severity",
  },
  {
    slug: "us-wildfires-and-drought",
    title: "US Wildfires and Drought",
    description:
      "Exploratory data analysis of US wildfires and drought using R and linear regression.",
    external: true,
    url: "https://github.com/rrailton/us-wildfires-and-drought",
  },
  {
    slug: "advanced-dbt-bingeflix",
    title: "Advanced dbt — Bingeflix",
    description:
      "Uplimit Advanced dbt course covering reusable macros, incremental models, unit testing, cost monitoring, and DAG refactoring on Snowflake.",
    external: true,
    url: "https://github.com/rrailton/course_advanced_dbt",
  },
];

// Skill proficiency: 1-10 scale
export const skills = {
  labels: [
    "SQL",
    "Analytics Engineering",
    "BI & Visualization",
    "Agent-Driven Development",
    "Python",
    "Data Engineering",
  ],
  values: [9, 9, 8, 7, 6, 6],
};
