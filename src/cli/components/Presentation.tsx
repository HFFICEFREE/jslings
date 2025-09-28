import React, { useEffect } from "react";
import { Text, Box, useApp, useInput } from "ink";
import { UserData } from "../../types/user.types.js";
import { Exercise, Status } from "../../types/exercises.types.js";
import { Command } from "../../types/cli.types.js";
import { writeFileToPath } from "../utils/fileSystem.js";
import { CodeEngine } from "../engine/code-engine.js";
import { completeExercise } from "../utils/user.js";
import chalk from "chalk";
import * as path from "path";
import { produce } from "immer";

interface PresentationInterface {
    userdata: UserData;
    database: Exercise[];
    setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

interface CommandListProps {
    commands: Command[];
}
const CommandList: React.FC<CommandListProps> = ({ commands }) => (
    <Box marginTop={1}>
        {commands.map(({ key, name }) => (
            <Box key={key} marginRight={2}>
                <Box marginRight={1} flexShrink={0}>
                    <Text color="white">({key})</Text>
                </Box>
                <Text color="gray">{name}</Text>
            </Box>
        ))}
    </Box>
);

interface CompleteItemsInterface {
    ids: string[];
    database: Exercise[];
}

const CompleteItems: React.FC<CompleteItemsInterface> = ({ ids, database }) => {
    return (
        <Box flexDirection="column" alignItems="flex-start" paddingRight={10}>
            <Text color="greenBright" underline={true}>
                Completed Exercises {"✅"}
            </Text>
            <Text>{"\n"}</Text>
            {ids.map((id, _) => {
                // Should be unique, hence can access 0th element
                const { name } = database.filter(
                    (ex: Exercise) => ex.id === id,
                )[0];
                return (
                    <Text color="green" key={id}>
                        {"[x]"} {name}
                    </Text>
                );
            })}
        </Box>
    );
};

interface CurrentItemsInterface {
    userdata: UserData;
}

const CurrentItem: React.FC<CurrentItemsInterface> = ({ userdata }) => {
    // Will be unique, hence can access 0th element
    const hintsAlreadyShown = userdata.current.info.hints.filter(
        (_, idx) => idx < userdata.current.currentHintIndex,
    );

    const hintsPresentationalComponent = (hintsAlreadyShown: string[]) => {
        return (
            <Box
                flexDirection="column"
                alignItems="stretch"
                paddingLeft={10}
                paddingRight={10}>
                <Text color="yellowBright">Hints {"❗❗"}</Text>
                {hintsAlreadyShown.map((hint, idx) => (
                    <Text color="yellow" key={idx}>
                        {"🤔😲"} {hint}
                        {"\n"}
                    </Text>
                ))}
            </Box>
        );
    };
    return (
        <Box flexDirection="column">
            <Text color="yellowBright" underline={true}>
                Currently Solving{"⏱️"}
            </Text>
            <Text>{"\n"}</Text>
            <Text color="yellowBright" italic={true}>
                Category :{" "}
                {
                    userdata.current.info.testPath.split(path.sep)[
                    userdata.current.info.testPath.split(path.sep).length -
                    2
                    ]
                }
            </Text>
            <Text>{"\n"}</Text>
            <Text color="yellow">
                Exercise Name : {userdata.current.info.name}
            </Text>
            <Text>{"\n"}</Text>
            {hintsAlreadyShown.length > 0
                ? hintsPresentationalComponent(hintsAlreadyShown)
                : null}
        </Box>
    );
};

interface IncompleteItemsInterface {
    completedIds: string[];
    database: Exercise[];
}

const IncompleteItems: React.FC<IncompleteItemsInterface> = ({
    completedIds,
    database,
}) => {
    const remainingExercisesId = database
        .map((exercise) => exercise.id)
        .filter((id) => !completedIds.includes(id));
    const remainingExercises = database.filter((exercise) =>
        remainingExercisesId.includes(exercise.id),
    );
    return (
        <Box
            flexDirection="column"
            alignItems="flex-end"
            paddingLeft={10}
            alignSelf="center">
            <Text color="redBright" underline={true}>
                Incomplete Exercises {"👀"}
            </Text>
            <Text>{"\n"}</Text>
            {remainingExercises.map((exercise, idx) => {
                return (
                    <Text color="red" key={idx}>
                        {"-"} {exercise.name}
                    </Text>
                );
            })}
        </Box>
    );
};

const Presentation: React.FC<PresentationInterface> = ({
    userdata,
    database,
    setUserData,
}) => {
    const { exit } = useApp();

    useEffect(() => {
        // force a rerender
    }, [userdata]);

    const keyboardCommands: Map<string, Command> = new Map([
        [
            "q",
            {
                key: "q",
                name: "quit",
                handler: async ({ userdata }) => {
                    writeFileToPath<UserData>(
                        userdata,
                        process.cwd(),
                        ".userdata.json",
                    );
                    exit();
                },
            },
        ],
        [
            "c",
            {
                key: "c",
                name: "check code",
                handler: async ({ userdata, database }) => {
                    const codeEngine = new CodeEngine(userdata, database);
                    try {
                        // Get exit code from Jest
                        const result = await codeEngine.runTest();

                        // If Jest failed, the test is not complete
                        const newUserdata =
                            result === 1
                                ? userdata
                                : (completeExercise(
                                    userdata,
                                    userdata.current.id,
                                    database,
                                ) as UserData);

                        setUserData({ ...newUserdata });
                    } catch (err: any) {
                        if (
                            err.message ===
                            "Congratulations! You have completed jslings 🔥"
                        ) {
                            console.log(chalk.green(err.message));
                            setUserData({
                                completed: database.map((ex) => ex.id),
                                current: {
                                    ...userdata.current,
                                    status: Status.DONE,
                                },
                            });
                        } else {
                            console.log(chalk.red(err.message));
                        }
                    }
                },
            },
        ],
        [
            "h",
            {
                key: "h",
                name: "show hint",
                handler: async ({ userdata }) => {
                    if (
                        userdata.current.currentHintIndex >=
                        userdata.current.info.hints.length
                    ) {
                        console.log(
                            chalk.red(
                                "Sorry, we don't have any more hints for you.",
                            ),
                        );
                    } else {
                        setUserData(
                            produce(userdata, (draftUserData) => {
                                draftUserData.current.currentHintIndex += 1;
                                return draftUserData;
                            }) as UserData,
                        );
                    }
                },
            },
        ],
    ]);

    useInput((input: string, _: any) => {
        keyboardCommands.get(input)?.handler({ userdata, database });
    });

    return (
        <Box flexDirection="column">
            <Box marginY={1} marginLeft={1}>
                <Text bold backgroundColor="cyan" color="#000">
                    {"🐙"}
                    JSLings{"🐙"}
                </Text>
            </Box>
            <Box flexDirection="row">
                <CompleteItems ids={userdata.completed} database={database} />
                {userdata.current.status !== Status.DONE ? (
                    <Box>
                        <CurrentItem userdata={userdata} />
                        <IncompleteItems
                            completedIds={userdata.completed}
                            database={database}
                        />
                    </Box>
                ) : (
                    <Text color="greenBright">
                        Congratulations! You have completed jslings 🔥
                    </Text>
                )}
            </Box>
            <CommandList commands={Array.from(keyboardCommands.values())} />
        </Box>
    );
};

export default Presentation;
