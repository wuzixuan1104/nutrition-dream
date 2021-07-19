/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import S3 from 'aws-sdk/clients/s3';

const uploadToS3 = async ({
  key, 
  body, 
  mimeType,
}): Promise<any> => {
  const s3Service = new S3({
    accessKeyId: process?.env?.S3_ACCESS,
    secretAccessKey: process?.env?.S3_SECRET,
  });

  const upload = await s3Service.putObject(
    {
      Bucket: process?.env?.S3_BUCKET,
      Key: key,
      Body: body,
      ContentType: mimeType,
      ACL: 'public-read',
    }
  ).promise();

  return upload;
};

export default uploadToS3;
