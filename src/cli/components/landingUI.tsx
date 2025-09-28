import React, { useState } from "react";
import Presentation from "./Presentation.js";
import {
    isFilePresent,
    loadJSONDataFromFileIfPresentElseCreateFileAndLoad,
} from "../utils/fileSystem.js";
import { Exercise, FileStatus } from "../../types/exercises.types.js";
import { UserData } from "../../types/user.types.js";
import { clearUserDataAndStartFresh } from "../utils/user.js";

const Landing: React.FC = () => {
    try {
        const [database, _] = useState(
            loadJSONDataFromFileIfPresentElseCreateFileAndLoad<Exercise[]>(
                process.cwd(),
                "exercises.json",
            ),
        );
        if (
            !(
                isFilePresent(process.cwd(), ".userdata.json") ===
                FileStatus.SUCCESS
            )
        ) {
            clearUserDataAndStartFresh(database);
        }
        const [userdata, setUserdata] = useState(
            loadJSONDataFromFileIfPresentElseCreateFileAndLoad<UserData>(
                process.cwd(),
                ".userdata.json",
            ),
        );
        return (
            <Presentation
                userdata={userdata}
                database={database}
                setUserData={setUserdata}
            />
        );
    } catch (err) {
        throw err;
    }
};

export default Landing;
