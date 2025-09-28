import { Exercise } from "./exercises.types.js";
import { UserData } from "./user.types.js";

/**
 * This interface implements our testing engine
 */
export interface CodeEngineInterface {
    userdata: UserData;
    database: Exercise[];
    runTest(): void;
}
