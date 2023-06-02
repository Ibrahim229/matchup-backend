import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { config } from 'dotenv';

config();

const s3Config = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY ?? "",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
    }
})
const upload = multer({
    storage: multerS3({
        s3: s3Config,
        bucket: process.env.AWS_BUCKET_Name ?? "",
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        metadata: (_req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (_req, _file, cb) => {
            cb(null, Date.now().toString());
        },
    }),
});

export default upload;
