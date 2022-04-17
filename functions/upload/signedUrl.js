'use strict';

const AWS = require('aws-sdk');
const { formatSuccess, formatError, isDev, uniqueId } = require('../../utils/helper');

let s3;

if (isDev) {
  s3 = new AWS.S3({
    s3ForcePathStyle: true,
    accessKeyId: 'S3RVER',
    secretAccessKey: 'S3RVER',
    endpoint: new AWS.Endpoint('http://localhost:4569'),
  });
} else {
  s3 = new AWS.S3();
}

module.exports.handler = async (event) => {
  try {
    const userId = event.requestContext.authorizer && event.requestContext.authorizer.principalId;
    const { originalFilename, type } = JSON.parse(event.body);

    // custom filename using random uuid + file extension
    const fileExtension = originalFilename.split('.').pop();
    const filename = `${userId}/${uniqueId()}.${fileExtension}`;

    const params = {
      Bucket: process.env.S3_BUCKET,
      Key: filename,
      ContentType: type,
      Expires: 60, // 1 minute expiration
    };
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrlPromise-property
    const signedUrl = await s3.getSignedUrlPromise('putObject', params);

    return formatSuccess({
      signedUrl,
      filename,
      originalFilename,
      publicUrl: signedUrl.split('?').shift(),
    });
  } catch (err) {
    console.log('Error getting presigned url from AWS S3:', err);
    return formatError('Cannot create S3 signed URL', 502);
  }
};
