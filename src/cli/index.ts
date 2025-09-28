#!/usr/bin/env node

import React from "react";
import { Command } from "commander";
import { clearUserDataAndStartFresh } from "./utils/user.js";
import Landing from "./components/landingUI.js";
import chalk from "chalk";
import { loadJSONDataFromFileIfPresentElseCreateFileAndLoad } from "./utils/fileSystem.js";
import { Exercise } from "../types/exercises.types.js";

const program = new Command();

program
    .name("jslings")
    .description("jslings can help YOU master Javascript on the terminal")
    .on("--help", () => {
        console.log("");
        console.log("Examples:");
        console.log("");
        console.log("  $ jslings watch");
        console.log("  $ jslings clear");
    });

program
    .command("watch")
    .alias("w")
    .description("jslings interactive code testing UI")
    .action(async () => {
        try {
            const { render } = await import("ink");
            render(React.createElement(Landing));
        } catch (error) {
            console.error("Error rendering Landing component:", error);
            process.exit(1);
        }
    });

program
    .command("clear")
    .alias("r")
    .description("Clears all your userdata to start fresh")
    .action(() => {
        try {
            const database = loadJSONDataFromFileIfPresentElseCreateFileAndLoad<
                Exercise[]
            >(process.cwd(), "exercises.json");
            clearUserDataAndStartFresh(database);
            console.log(chalk.greenBright("Reset successful"));
        } catch (error) {
            console.error("Error clearing user data:", error);
            process.exit(1);
        }
    });

program.parse(process.argv);
