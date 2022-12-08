import { model, Schema } from "mongoose";

interface IMainStorage {
    ID: string,
    Date: string,
    User: string,
    Driver: string,
    Type: string,
    SubType: string,
    Amount: number,
    Status: string
}

const mainStorageSchema = new Schema<IMainStorage>();

const mainStorage = model<IMainStorage>("MainStorage", mainStorageSchema);

export default mainStorage;
export { IMainStorage, mainStorage };
