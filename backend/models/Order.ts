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
    "history": History
}

const orderSchema = new Schema<IOrder>({
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    status: Schema.Types.String,
    date: Schema.Types.Date,
    reception: {
        address: Schema.Types.String,
        limit: Schema.Types.Number,
    },
    material: {
        title: Schema.Types.String,
        subtype: Schema.Types.String,
        count: Schema.Types.Number,
        price: Schema.Types.Number,
    },
    history: Schema.Types.Array,
});

const order = model("Order", orderSchema);

export { IOrder, order };
