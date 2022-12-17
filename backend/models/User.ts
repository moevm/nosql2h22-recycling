import { Schema, model } from "mongoose";

interface IUser {
    "login": string,
    "password": string,
    "email": string,
    "role": string,
    "firstName": string,
    "lastName": string,
    "loyalty": number,
    "orders": [{ type: Schema.Types.ObjectId, ref: "Order" }]
}

const userSchema = new Schema<IUser>({
    login: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    loyalty: {
        type: Schema.Types.Number,
        required: true,
    },
    orders: {
        type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
        required: true,
    },
});

const insertUserSchema = new Schema({
    _id: {
        type: Schema.Types.String,
        required: true,
    },
    login: {
        type: Schema.Types.String,
        required: true,
    },
    password: {
        type: Schema.Types.String,
    },
    email: {
        type: Schema.Types.String,
        required: true,
    },
    role: {
        type: Schema.Types.String,
        required: true,
    },
    firstName: {
        type: Schema.Types.String,
        required: true,
    },
    lastName: {
        type: Schema.Types.String,
        required: true,
    },
    loyalty: {
        type: Schema.Types.Number,
        required: true,
    },
    orders: {
        type: [{ type: Schema.Types.String, ref: "Order" }],
        required: true,
    },
});

const user = model<IUser>("Users", userSchema);

export {
    IUser, user, userSchema, insertUserSchema,
};
