import { NodePlopAPI } from "plop";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { Exercise } from "../types/exercises.types";
import { GeneratorData } from "../types/generator.types";

module.exports = (plop: NodePlopAPI) => {
    plop.setGenerator("exercise", {
        description: "gerar um novo exercício com testes",
        prompts: [
            {
                type: "list",
                name: "concept",
                message: "escolha um conceito JavaScript",
                choices: [
                    "strings",
                    "numbers",
                    "variables",
                    "conditions",
                    "functions",
                ],
            },
            {
                type: "input",
                name: "exercise",
                message: "digite um nome para o exercício (ex: strings1)",
            },
        ],
        actions: [
            {
                type: "add",
                path: path.join(
                    "..",
                    "..",
                    "exercises",
                    "{{concept}}",
                    "{{exercise}}.js",
                ),
                templateFile: path.join("templates", "exercise.hbs"),
            },
            {
                type: "add",
                path: path.join(
                    "..",
                    "__tests__",
                    "{{concept}}",
                    "{{exercise}}.test.ts",
                ),
                templateFile: path.join("templates", "test.hbs"),
            },
            {
                type: "modify",
                path: path.join("..", "..", "exercises.json"),
                transform: (
                    contents: string,
                    { concept, exercise }: GeneratorData,
                ): string => {
                    const exerciseCatalogue: Exercise[] = JSON.parse(contents);

                    exerciseCatalogue.push({
                        id: uuidv4(),
                        name: exercise,
                        path: path.join(
                            "./",
                            "exercises",
                            concept,
                            `${exercise}.js`,
                        ),
                        testPath: path.join(
                            "..",
                            "__tests__",
                            concept,
                            `${exercise}.ts`,
                        ),
                        hints: ["Adicione dicas para ajudar o usuário"],
                    });
                    return JSON.stringify(exerciseCatalogue, null, 2);
                },
            },
        ],
    });
};
