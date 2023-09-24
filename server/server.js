const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = 4000
const uri =
"mongodb+srv://mbobic1:SQgYnKTAojJpn7oA@cluster0.i1ax5zn.mongodb.net/?retryWrites=true&w=majority";

app.get('/add',async (req, res) => {
const client = new MongoClient(uri);
await client.connect();
const database = client.db('Cluster0');
const collection = database.collection(req.body.collectionName);
try {
    const insertManyResult = await collection.insertMany(req.body.data);
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})