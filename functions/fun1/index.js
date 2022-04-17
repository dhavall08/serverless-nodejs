'use strict';

const { formatSuccess, formatError } = require('../../utils/helper');

// if function is async, then return the response directly,
// else use callback to pass response as below
// callback(null, response);
// callback(error, null)

// module.exports.handler = (event, context, callback) => {
module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false; // default: true
  // Set to false to send the response right away when the callback runs, instead of waiting for the Node.js event loop to be empty.

  try {
    console.log(event.httpMethod); // GET, POST, PUT, DELETE

    let data;
    if (event.httpMethod === 'GET') {
      const params = event.pathParameters && event.pathParameters.id;
      const queryStrings = event.queryStringParameters;
      data = {
        pathParams: params,
        queryStrings,
      };
    } else {
      data = {
        body: JSON.parse(event.body), // body for POST, PUT
      };
    }

    return formatSuccess({
      message: 'Function executed successfully',
      data,
    });
  } catch (error) {
    return formatError(error.message);
  }
};
