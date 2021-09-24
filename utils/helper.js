const MongoClient = require("mongodb").MongoClient;
const MONGO_URI = process.env.MONGO_URI;
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Connect to our mongoDB database
  const client = await MongoClient.connect(MONGO_URI, {
    useUnifiedTopology: true,
  });

  // Specify which database we want to use
  const db = await client.db(process.env.MONGO_DB);
  cachedDb = db;
  return db;
}

const commonHeaders = {
  "Access-Control-Allow-Methods": "POST,GET,PUT,DELETE,OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with",
  "Access-Control-Allow-Origin": "*",
};

const formatSuccess = function (data) {
  return {
    statusCode: 200,
    headers: {
      ...commonHeaders,
    },
    body: JSON.stringify(data, null, 2),
  };
};

const formatError = function (error, statusCode = 400) {
  return {
    statusCode: statusCode,
    headers: {
      ...commonHeaders,
    },
    body: JSON.stringify({ message: error }, null, 2),
  };
};

module.exports = {
  formatSuccess,
  formatError,
  connectToDatabase,
  commonHeaders,
};
