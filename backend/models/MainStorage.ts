import {model, Schema} from "mongoose";

interface IMainStorage {
    ID: string,
    Date: string,
    Type: string,
    SubType: string,
    Amount: number,
    Status: string
}

const mainStorageSchema = new Schema<IMainStorage>();

const mainStorage = model<IMainStorage>("MainStorage", mainStorageSchema);

export default mainStorage
export {IMainStorage, mainStorage}
