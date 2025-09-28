import { Exercise } from "./exercises.types.js";
import { UserData } from "./user.types.js";

export type Command = {
    key: string;
    name: string;
    handler: (state: State) => Promise<void>;
};

export type State = {
    userdata: UserData;
    database: Exercise[];
};
