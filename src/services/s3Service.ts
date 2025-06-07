import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY!,
  secretAccessKey: process.env.S3_SECRET_KEY!,
  endpoint: process.env.S3_ENDPOINT!,
  region: process.env.S3_REGION!,
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

export default s3;
