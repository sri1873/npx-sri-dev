#!/usr/bin / env node

import pc from "picocolors";
import * as p from "@clack/prompts";
import open from "open";

const GITHUB = "https://github.com/sri1873";
const LINKEDIN = "https://www.linkedin.com/in/ks-srikumar/";
const heading = (text) => pc.bold(pc.cyan(text));
const bullet = pc.green("  ›");

function showHeader() {
    console.log(pc.yellow("Feel free to explore my profile and connect with me!"));
}

async function main() {
    p.intro(`${(pc.cyan("Hey there! I'm Srikumar K S, a Software Engineer."))}
       Welcome to my interactive portfolio!`//the spacing here is intentional to make the text look better in the terminal
    );

    showHeader();

    while (true) {
        const action = await p.select({
            message: "What would you like to explore?",
            options: [
                { value: "about", label: "About me" },
                { value: "skills", label: "Technical skills" },
                { value: "projects", label: "Projects" },
                { value: "github", label: "GitHub profile",hint: "This will redirect to my GitHub profile" },
                { value: "linkedin", label: "LinkedIn profile", hint: "This will redirect to my LinkedIn profile" },
                { value: "exit", label: "Exit" },
            ],
        });

        if (p.isCancel(action)) {
            p.cancel("Well that was a bummer.");
            break;
        }


        switch (action) {
            case "about": {

                p.note(
                    [
                        `I'm ${pc.bold(pc.white("Sri Kumar"))} ${pc.gray("a Java Backend Developer")}`,
                        "",
                        heading("A LITTLE ABOUT ME"),
                        `${bullet} Completed my Master's in Software Engineering from the University of Limerick, Ireland.`,
                        `${bullet} I get curious about how software actually works, so I end up reading articles and reverse engineering things to understand what's going on under the hood. Most recent rabbit hole: food delivery apps.`,
                        "",
                        heading("WHAT I'VE WORKED ON"),
                        `${bullet} Worked at a fast-paced startup called ${pc.bold("Effigo")}, where I got thrown into multiple teams and got to work on quite a mix of things.`,
                        `${bullet} React on the frontend, Spring Boot microservices and multi-tenant architecture on the backend, and a bit of AWS along the way.`,
                        `${bullet} Built a POC on Keycloak and Spring MVC exploring SSO, OIDC and OAuth2, to fully automate login for a multi-tenant application with multiple identity providers. IT GOT INTEGRATED!!!`,
                        ,
                        heading("CURRENT INTERESTS IN TECH "),
                        `${bullet} Observability — figuring out graceful exits, logging and monitoring.`,
                        `${bullet} CI/CD workflows — This package has its own worflow, and it took me 11 commits to get it right.`,
                        `${bullet} AWS architecture and cost optimization.`,
                        `${bullet} Agentic AI — Not fully depending on LLMs.`,
                    ].join("\n"),
                    "Hello, again!"
                );

                break;
            }

            case "skills":
                p.note(
                    [
                        "Languages: Java, JavaScript, TypeScript",
                        "Frameworks: Spring Boot, Node.js, React",
                        "Databases: PostgreSQL, MySQL, MongoDB",
                        "Cloud & tools: AWS, Docker, Git, Jenkins, GitHub Actions",
                    ].join("\n"),
                    "Technical skills"
                );
                break;


            case "projects": {
                const project = await p.select({
                    message: "Pick a rabbit hole to explore:",
                    options: [
                        {
                            value: "food",
                            label: "Event-Driven Food Delivery System",
                            hint: "Microservices, Kafka, Redis"
                        },
                        {
                            value: "search",
                            label: "Inverted GitHub",
                            hint: "Search engines, indexing, ranking"
                        },
                        {
                            value: "back",
                            label: "Back to main menu"
                        }
                    ]
                });

                if (p.isCancel(project) || project === "back") {
                    break;
                }

                if (project === "food") {
                    p.note(
                        [
                            pc.bold(pc.white("Event-Driven Food Delivery System")),
                            pc.gray("A food delivery platform built around events and real-time tracking."),
                            "",
                            heading("WHAT I BUILT"),
                            `${bullet} Architected 4 Spring Boot microservices for orders, customers, restaurants and riders.`,
                            `${bullet} Used Apache Kafka in KRaft mode for event-driven communication between services.`,
                            `${bullet} Used Redis GEO for rider location tracking and proximity-based assignment, with atomic order claiming to avoid race conditions.`,
                            `${bullet} Built 3 React dashboards for customers, restaurants and riders, with live order updates using Server-Sent Events (SSE).`,
                            `${bullet} Implemented a 6-stage order state machine and integrated Mapbox for live rider tracking.`,
                            "",
                            heading("TECH STACK"),
                            pc.cyan("Spring Boot · Kafka · Redis · React · PostgreSQL · Mapbox · SSE")
                        ].join("\n"),
                        "Project 01"
                    );
                }

                if (project === "search") {
                    p.note(
                        [
                            pc.bold(pc.white("Inverted GitHub")),
                            pc.gray("A file-based search engine inspired by Lucene and Elasticsearch."),
                            "",
                            heading("WHAT I BUILT"),
                            `${bullet} Implemented an inverted index with a custom tokenization pipeline to turn files into searchable posting lists.`,
                            `${bullet} Added TF-IDF and BM25 scoring to rank search results by relevance.`,
                            `${bullet} Built a query parser and execution engine supporting AND, OR, NOT, phrase and term searches.`,
                            `${bullet} Implemented disk-based index persistence for storing and retrieving indexed data.`,
                            "",
                            heading("TECHNICAL FOCUS"),
                            pc.cyan("Indexing · Information Retrieval · Query Parsing · Ranking Algorithms · File I/O")
                        ].join("\n"),
                        "Project 02"
                    );
                }

                break;
            }


            case "github":
                p.log.info("Opening GitHub profile...");
                await open(GITHUB);
                break;

            case "linkedin":
                p.log.info("Opening LinkedIn profile...");
                await open(LINKEDIN);
                break;

            case "exit":
                p.outro("Thanks for checking out my profile.");
                return;
        }
    }

    p.outro("Thanks for checking out my profile.");
}

try {
    await main();
} catch (error) {
    console.error("Something went wrong:", error.message);
    process.exitCode = 1;
}