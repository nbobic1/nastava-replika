const express = require('express')
const app = express()
const { MongoClient } = require("mongodb");
const port = 4000

const cors = require('cors');
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors({
    origin: ['http://127.0.0.1:5173','http://localhost:3000'],
    credentials:true
  }));

const uri =
"mongodb+srv://mbobic1:SQgYnKTAojJpn7oA@cluster0.i1ax5zn.mongodb.net/?retryWrites=true&w=majority";

app.post('/add',async (req, res) => {
const client = new MongoClient(uri);
await client.connect();
const database = client.db('Cluster0');
const collection = database.collection(req.body.collectionName);
try {
    const insertManyResult = await collection.insertMany(ensureArray(req.body.data));
    console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
  } catch (err) {
    console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
  }
  client.close()
  res.send('Hello World!')
})


app.post('/read',async (req, res) => {
const client = new MongoClient(uri);
await client.connect();
const database = client.db('Cluster0');
const collection = database.collection(req.body.collectionName);
const docs = await collection.find({}).toArray();
 client.close(); // Close the connection
res.send(docs)
    })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

function ensureArray(value) {
    if (Array.isArray(value)) {
      // If it's already an array, return it as is
      return value;
    } else if (value !== null && typeof value !== 'undefined') {
      // If it's not an array, create a new array with the value as its single element
      return [value];
    } else {
      // Handle cases where the value is null or undefined (return an empty array or handle as needed)
      return [];
    }
  }