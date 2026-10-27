#!/usr/bin/env node

import pc from "picocolors";
import { intro, select, isCancel,cancel, note, log, outro } from "@clack/prompts";
import open from "open";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const NAME = "Srikumar K S";
const ROLE = "Java backend engineer";
const GITHUB = "https://github.com/sri1873";
const LINKEDIN = "https://www.linkedin.com/in/ks-srikumar/";
const EMAIL = "kssrikumar180703@gmail.com";

// Colors: magenta = you, cyan = structure, green = tech terms, gray = secondary.
const accent = (t) => pc.magenta(t);
const heading = (t) => pc.cyan(t);
const hl = (t) => pc.greenBright(t.replaceAll(" ", "\u00a0")); // non-breaking spaces keep the term on one line
const muted = (t) => pc.gray(t);

const WIDTH = Math.max(40, Math.min((process.stdout.columns || 80) - 10, 76));
const visibleLength = (text) => text.replace(/\u001b\[[0-9;]*m/g, "").length;
function wrapLines(text, width) {
    const lines = [];
    let line = "";
    for (const word of text.split(" ")) {
        const next = line ? `${line} ${word}` : word;
        if (line && visibleLength(next) > width) {
            lines.push(line);
            line = word;
        } else {
            line = next;
        }
    }
    if (line) lines.push(line);
    return lines;
}
const paragraph = (text, style = (s) => s) =>
    wrapLines(text, WIDTH).map((line) => style(line)).join("\n");

const bullet = (text) =>
    wrapLines(text, WIDTH - 4)
        .map((line, i) => (i === 0 ? `${accent("  ›")} ${line}` : `    ${line}`))
        .join("\n");

const tags = (items) =>
    paragraph(items.map((t) => t.replaceAll(" ", "\u00a0")).join("\u00a0· "), (s) => pc.green(s));

const PROJECTS = [
    {
        value: "food",
        title: "Pizza-Kafka",
        label: "Event-Driven Food Delivery System",
        hint: "Microservices, Kafka, Redis",
        summary: "What happens after you tap 'Order', rebuilt from scratch with events and live tracking.",
        points: [
            `Architected ${hl("4 Spring Boot microservices")} for orders, customers, restaurants and riders.`,
            `Used ${hl("Apache Kafka")} in KRaft mode for event-driven communication between services.`,
            `Used ${hl("Redis GEO")} for rider location tracking and proximity-based assignment, with atomic order claiming to avoid race conditions.`,
            `Built 3 React dashboards for customers, restaurants and riders, with live order updates over ${hl("Server-Sent Events")} (SSE).`,
            `Implemented a ${hl("6-stage order state machine")} and integrated Mapbox for live rider tracking.`,
        ],
        tagsTitle: "TECH STACK",
        tags: ["Spring Boot", "Kafka", "Redis", "React", "PostgreSQL", "Mapbox", "SSE"],
        repo: "https://github.com/sri1873/Pizza-Kafka",
    },
    {
        value: "search",
        title: "Project 02",
        label: "Inverted",
        hint: "Search engines, indexing, ranking",
        summary: "A search engine for files, built from scratch to see how Lucene and Elasticsearch work inside.",
        points: [
            `Implemented an ${hl("inverted index")} with a custom tokenization pipeline to turn files into searchable posting lists.`,
            `Added ${hl("TF-IDF")} and ${hl("BM25")} scoring to rank search results by relevance.`,
            `Built a ${hl("query parser")} and execution engine supporting AND, OR, NOT, phrase and term searches.`,
            `Implemented ${hl("disk-based index persistence")} for storing and retrieving indexed data.`,
        ],
        tagsTitle: "TECHNICAL FOCUS",
        tags: ["Indexing", "Information Retrieval", "Query Parsing", "Ranking Algorithms", "File I/O"],
        repo: "https://github.com/sri1873/Inverted",
    },
];

function getAboutMe() {
    return note(
        [
            `I'm ${accent(NAME)}, ${muted(`a ${ROLE}.`)}`,
            "",
            heading("A LITTLE ABOUT ME"),
            bullet("Completed my Master's in Software Engineering at the University of Limerick, Ireland."),
            bullet("I can't use an app without wondering how it works, so I read, dig and reverse engineer until I know. Latest rabbit hole: food delivery apps, which turned into on of the Projects below."),
            "",
            heading("WHAT I'VE WORKED ON"),
            bullet(`Worked at ${accent("Effigo")}, a fast-paced startup that threw me into multiple teams. Best crash course I could have asked for.`),
            bullet(`React on the frontend, ${hl("Spring Boot microservices")} and ${hl("multi-tenant architecture")} on the backend, and a bit of AWS along the way.`),
            bullet(`Built a POC on ${hl("Keycloak")} and Spring MVC exploring SSO, OIDC and OAuth2, to fully automate login for a multi-tenant application with multiple identity providers. ${hl("It got Shipped!!")}`),
            "",
            heading("CURRENT INTERESTS IN TECH"),
            bullet(`${pc.blue("Observability")} — figuring out graceful exits, logging and monitoring.`),
            bullet(`${pc.blue("CI/CD workflows")} — this package ships itself through its own workflow. It took 11 commits. We don't talk about the first 10.`),
            bullet(`${pc.blue("AWS architecture")} and cost optimization, because surprise bills are only fun for Amazon.`),
            bullet(`${pc.blue("Agentic AI")} — where the LLM is one tool in the system, not the whole system.`),
        ].join("\n"),
        "Hello, again!"
    );
}

function getSkills() {
    note(
        [
            heading("LANGUAGES"),
            tags(["Java", "JavaScript", "TypeScript"]),
            "",
            heading("FRAMEWORKS"),
            tags(["Spring Boot", "Node.js", "React","Kafka","Redis"]),
            "",
            heading("AUTH & SSO"),
            tags(["Keycloak", "OAuth2", "OIDC"]),
            "",
            heading("DATABASES"),
            tags(["PostgreSQL", "MySQL", "MongoDB"]),
            "",
            heading("CLOUD & TOOLS"),
            tags(["AWS", "Docker", "Git", "Jenkins", "GitHub Actions"]),
        ].join("\n"),
        "Technical skills"
    );
}

function showProject(project) {
    const lines = [
        accent(project.label),
        paragraph(project.summary, muted),
        "",
        heading("WHAT I BUILT"),
        ...project.points.map((point) => bullet(point)),
        "",
        heading(project.tagsTitle),
        tags(project.tags),
    ];
    if (project.repo) lines.push("", `${muted("Code:")} ${pc.underline(project.repo)}`);
    note(lines.join("\n"), project.title);
}

async function showProjects() {
    while (true) {
        const choice = await select({
            message: "Pick a rabbit hole to explore:",
            options: [
                ...PROJECTS.map(({ value, label, hint }) => ({ value, label, hint })),
                { value: "back", label: "Back to main menu" },
            ],
        });
        if (isCancel(choice) || choice === "back") return;
        showProject(PROJECTS.find((project) => project.value === choice));
    }
}

async function openLink(label, url) {
    log.info(`Opening ${label}: ${pc.underline(url)}`);
    try {
        await open(url);
    } catch {
        log.warn("Couldn't open a browser here. The link above works too.");
    }
}

function sayGoodbye(type) {
    note(
        [
            `GitHub    ${pc.underline(GITHUB)}`,
            `LinkedIn  ${pc.underline(LINKEDIN)}`,
            `Email     ${pc.underline(EMAIL)}`,
        ].join("\n"),
        "Let's stay in touch"
    );
    type === "cancel" && cancel("Thanks for stopping by! My inbox is always open.");
    type === "exit" && outro("Thanks for stopping by! My inbox is always open.");
}

async function main() {
    intro(accent(`Hey there! I'm ${NAME}.`));
    log.message(
        [
            `A ${ROLE} who can't leave a black box alone.`,
            muted("Welcome to my portfolio."),
        ].join("\n")
    );

    while (true) {
        const action = await select({
            message: "What would you like to explore?",
            options: [
                { value: "about", label: "About me" },
                { value: "skills", label: "Technical skills" },
                { value: "projects", label: "Projects" },
                { value: "github", label: "GitHub profile", hint: "opens in your browser" },
                { value: "linkedin", label: "LinkedIn profile", hint: "opens in your browser" },
                { value: "exit", label: "Exit" },
            ],
        });

        if (isCancel(action)) {
            sayGoodbye("cancel");
            return;
        }


        switch (action) {
            case "about": {
                getAboutMe();
                break;
            }

            case "skills":
                getSkills();
                break;

            case "projects": {
                await showProjects();
                break;
            }
            case "github":
                await openLink("GitHub", GITHUB);
                break;

            case "linkedin":
                await openLink("LinkedIn", LINKEDIN);
                break;

            case "exit":
                sayGoodbye("exit");
                return;
        }
    }

}
function relaunchWithWinpty() {
    const isInGitBash = process.platform === "win32" && process.env.MSYSTEM;
    if (!isInGitBash || process.env.SRI_DEV_WINPTY) return;

    const result = spawnSync("winpty", [process.execPath, fileURLToPath(import.meta.url), ...process.argv.slice(2)], {
        stdio: "inherit",
        env: { ...process.env, SRI_DEV_WINPTY: "1" },
    });

    if (!result.error) process.exit(result.status ?? 0);
    console.error("This menu needs an interactive terminal. Try: winpty npx.cmd sri-dev");
    process.exit(1);
}

if (!process.stdin.isTTY) {
    relaunchWithWinpty();
    console.error("This menu needs an interactive terminal.");
    process.exit(1);
}

try {
    await main();
} catch (error) {
    console.error("Something went wrong:", error.message);
    process.exitCode = 1;
}