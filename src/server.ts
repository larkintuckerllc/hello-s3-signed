import aws from 'aws-sdk';
import cors from 'cors';
import express from 'express';
import env from './apis/env';

const KEY = 'cat.jpeg';
aws.config.update({
  accessKeyId: env.AWS_ACCESS_KEY_ID,
  secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
});
const s3 = new aws.S3();
const app = express();
app.use(cors());
app.get('/', (req, res) => res.send({ hello: 'world' }));
app.get('/signed', (req, res) => {
  const params = { Bucket: 'hello-s3-signing', Key: KEY };
  const url = s3.getSignedUrl('getObject', params);
  res.redirect(url);
});
app.listen(3000, () => console.log('Example app listening on port 3000!'));
