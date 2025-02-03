import { MongoClient, ServerApiVersion } from 'mongodb';

let db;

async function connectToDb(cb) {
  const uri = !process.env.MONGODB_USERNAME 
    ? 'mongodb://127.0.0.1:27017'
    : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.2m9q0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors:true,
      }
    });
    await client.connect();
    db = client.db('full-stack-react-db');
    cb();
}

export {
    db,
    connectToDb,
};