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
    .description("jslings pode te ajudar a dominar JavaScript no terminal")
    .on("--help", () => {
        console.log("");
        console.log("Exemplos:");
        console.log("");
        console.log("  $ jslings watch");
        console.log("  $ jslings clear");
    });

program
    .command("watch")
    .alias("w")
    .description("Interface interativa de teste de código do jslings")
    .action(async () => {
        try {
            const { render } = await import("ink");
            render(React.createElement(Landing));
        } catch (error) {
            console.error("Erro ao renderizar componente Landing:", error);
            process.exit(1);
        }
    });

program
    .command("clear")
    .alias("r")
    .description("Limpa todos os seus dados de usuário para começar do zero")
    .action(() => {
        try {
            const database = loadJSONDataFromFileIfPresentElseCreateFileAndLoad<
                Exercise[]
            >(process.cwd(), "exercises.json");
            clearUserDataAndStartFresh(database);
            console.log(chalk.greenBright("Reset realizado com sucesso"));
        } catch (error) {
            console.error("Erro ao limpar dados do usuário:", error);
            process.exit(1);
        }
    });

program.parse(process.argv);
