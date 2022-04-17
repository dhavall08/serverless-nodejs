'use strict';

const { formatSuccess, formatError } = require('../../utils/helper');

module.exports.handler = async (event) => {
  try {
    // receive userId from authorizer function (auth-token.js)
    const userId = event.requestContext.authorizer && event.requestContext.authorizer.principalId;

    return formatSuccess({ userId, message: 'You are authorized.' });
  } catch (error) {
    return formatError(error.message);
  }
};
