'use strict';

const isDev = process.env.STAGE === 'dev';

const commonHeaders = {
  'Access-Control-Allow-Methods': 'POST,GET,PUT,DELETE,OPTIONS',
  'Access-Control-Allow-Headers':
    'Content-Type,X-Amz-Date,Authorization,X-Api-Key,x-requested-with',
  'Access-Control-Allow-Origin': '*',
  // If HttpOnly cookie, then replace * with your domain because * won't be allowed by browsers.
};

const formatSuccess = function (data, otherMultiHeaders = {}) {
  return {
    statusCode: 200,
    headers: {
      ...commonHeaders,
    },
    multiValueHeaders: {
      ...(otherMultiHeaders || {}),
    },
    body: JSON.stringify(data, null, 2),
  };
};

const formatError = function (error, statusCode = 400, otherMultiHeaders = {}) {
  return {
    statusCode,
    headers: {
      ...commonHeaders,
    },
    multiValueHeaders: {
      ...(otherMultiHeaders || {}),
    },
    body: JSON.stringify({ message: error }, null, 2),
  };
};

const uniqueId = (length = 6) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};


module.exports = {
  isDev,
  formatSuccess,
  formatError,
  commonHeaders,
  uniqueId,
};

/* 
To set multiple cookies: httpOnly and other:

const cookieServer = require('cookie');
const authCookiesHeader = (token) => ({ // this can be passed in as multiValueHeaders in above formatSuccess
  'Set-Cookie': [
    cookieServer.serialize('token', String(token), {
      httpOnly: true,
      maxAge: TOKEN_EXP_IN,
      secure: !isDev,
      path: '/',
    }),
    cookieServer.serialize('role', 'user', {
      maxAge: TOKEN_EXP_IN,
      path: '/',
    }),
  ],
});

// To remove cookies:
const removeAuthCookies = {
  'Set-Cookie': [
    cookieServer.serialize('token', '', {
      httpOnly: true,
      secure: !isDev,
      maxAge: -1,
      path: '/',
    }),
    cookieServer.serialize('role', '', {
      maxAge: -1,
      path: '/',
    }),
  ],
};
 */
