import { Schema, model } from "mongoose";

interface IUser {
    "_id": Schema.Types.ObjectId,
    "login": string,
    "password": string,
    "email": string,
    "role": string,
    "firstName": string,
    "lastName": string,
    "loyalty": number,
    "orders": Array<Schema.Types.ObjectId>
}

const userSchema = new Schema<IUser>({
    "_id": Schema.Types.ObjectId,
    "login": Schema.Types.String,
    "password": Schema.Types.String,
    "email": Schema.Types.String,
    "role": Schema.Types.String,
    "firstName": Schema.Types.String,
    "lastName": Schema.Types.String,
    "loyalty": Schema.Types.Number,
    "orders": Schema.Types.Array
});

const user = model<IUser>("Users", userSchema);

export { IUser, user };
