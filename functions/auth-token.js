'use strict';

// ref: https://github.com/adnanrahic/a-crash-course-on-serverless-auth

// Policy helper function
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// verifier for wallet users
module.exports.auth = (event, context, callback) => {
  // check header or url parameters or post parameters for token
  const token = event.authorizationToken;

  if (!token) {
    return callback('Unauthorized'); // first param is error, second is response
  }

  return callback(null, generatePolicy(token, 'Allow', event.methodArn));

  /*  verify secret using jwt as below before allowing access to the resource.
  
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err || !decoded.id || decoded.role !== 'user') {
      return callback('Unauthorized');
    }

    // if everything is good, save to request for use in other routes
    return callback(null, generatePolicy(decoded.id, 'Allow', event.methodArn));
  }); 
  */
};
