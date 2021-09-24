"use strict";

module.exports.handler = async () => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(
      {
        message: "Success",
      },
      null,
      2
    ),
  };
};
