const { MongoClient } = require('mongodb');
import { ObjectId } from 'mongodb'

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'Recycling';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const users = db.collection('Users');
    const orders = db.collection('Orders');

    let user1ID = new ObjectId();
    let insertResult = await users.insertOne({_id: user1ID, login: "ivan.ivanov", password: "12345678",
        email: "test@test.com", role: "client", firstName: "Ivan", secondName: "Ivanov", loyality: 2, orders: []});
    console.log('Inserted documents =>', insertResult);

    let user2ID = new ObjectId();
    insertResult = await users.insertOne({_id: user2ID, login: "petrov95", password: "abcdefgh",
        email: "petrov95@gmail.com", role: "driver", firstName: "Petrov", secondName: "Alexander", orders: []});
    console.log('Inserted documents =>', insertResult);

    let orderID = new ObjectId();
    let query = {_id: {$in: [user1ID, user2ID]}};
    let newValues = {$push: {orders: orderID}};
    let updateResult = await users.updateOne(query, newValues);
    console.log('Updated documents =>', updateResult);

    insertResult = await orders.insertOne({_id: orderID, users: [], status: "Created", reception:
            {address: 'Saint-Petersburg', limit: 1000}, material: {title: "paper", price: 100, count: 10}});
    console.log('Inserted documents =>', insertResult);

    let query2 = {_id: orderID};
    let newValues2 = {$push: {users: user1ID}};
    let newValues3 = {$push: {users: user2ID}}
    updateResult = await orders.updateOne(query2, newValues2);
    console.log('Updated documents =>', updateResult);
    updateResult = await orders.updateOne(query2, newValues3);
    console.log('Updated documents =>', updateResult);

    let findResult = await users.find({}).toArray();
    console.log('Found documents from users =>', findResult);
    findResult = await orders.find({}).toArray();
    console.log('Found documents from orders =>', findResult);
    await client.close()
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());
