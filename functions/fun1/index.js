"use strict";

// if function is async, then return the response directly,
// else use callback to pass response as below
// callback(null, response);
// callback(error, null)

// module.exports.handler = (event, context, callback) => {
module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // default: true
  // Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty.

  console.log(event.httpMethod); // GET, POST, PUT, DELETE
  console.log(event.pathParameters.id); // path id
  const body = JSON.parse(event.body); // body

  const response = {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        message: "Success",
        bdoy: body,
      },
      null,
      2
    ),
  };

  return response;
};
