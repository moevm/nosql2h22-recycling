const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'HelloWorldDB';

async function main() {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('HelloWorldCollection');
    const insertResult = await collection.insertOne({"test": "HelloWorld"});
    console.log('Inserted documents =>', insertResult);
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
    await client.close()
    return 'done.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());