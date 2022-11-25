import {model, Schema, Types} from "mongoose";

interface Reception {
    "address": Schema.Types.String,
    "limit": Schema.Types.Number
}

interface Material {
    "title": Schema.Types.String,
    "subtype": Schema.Types.String,
    "count": Schema.Types.Number,
    "price": Schema.Types.Number
}

interface History {
    "status": Schema.Types.String,
    "date": Schema.Types.Date
}

interface IOrder{
    "_id": Schema.Types.ObjectId,
    "users": Array<Schema.Types.ObjectId>,
    "status": Schema.Types.String,
    "date": Schema.Types.Date,
    "reception": Reception,
    "material": Material,
    "history": History
}

const orderSchema = new Schema<IOrder>({
    "_id": Schema.Types.ObjectId,
    "users": Schema.Types.Array,
    "status": Schema.Types.String,
    "date": Schema.Types.Date,
    "reception": {
        "address": Schema.Types.String,
        "limit": Schema.Types.Number
      },
      "material": {
        "title": Schema.Types.String,
        "subtype": Schema.Types.String,
        "count": Schema.Types.Number,
        "price": Schema.Types.Number
    },
    "history": Schema.Types.Array
});

const order = model('Order', orderSchema);

export {IOrder, order}
