import { model, Schema } from "mongoose";

interface Reception {
    "address": string,
    "limit": number
}

interface Material {
    "title": string,
    "subtype": string,
    "count": number,
    "price": number
}

interface History {
    "status": string,
    "date": Date
}

interface IOrder {
    "users": Array<Schema.Types.ObjectId>,
    "status": string,
    "date": Date,
    "reception": Reception,
    "material": Material,
    "history": Array<History>
}

const orderSchema = new Schema<IOrder>({
    users: {
        type: [{ type: Schema.Types.ObjectId, ref: "User" }],
        required: true,
    },
    status: {
        type: Schema.Types.String,
        required: true,
    },
    date: {
        type: Schema.Types.Date,
        required: true,
    },
    reception: {
        type: {
            address: Schema.Types.String,
            limit: Schema.Types.Number,
        },
        required: true,
    },
    material: {
        type: {
            title: Schema.Types.String,
            subtype: Schema.Types.String,
            count: Schema.Types.Number,
            price: Schema.Types.Number,
        },
        required: true,
    },
    history: {
        type: [{ type: Schema.Types.ObjectId }],
        required: true,
    },
});

const order = model("Order", orderSchema);

export { IOrder, order, orderSchema };
