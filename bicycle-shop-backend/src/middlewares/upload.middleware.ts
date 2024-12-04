import multer from 'multer';
import multerS3 from 'multer-s3';
import { s3Client } from '@config/aws-s3';

const bucketName = process.env.AWS_BUCKET_NAME;

if (!bucketName) {
    throw new Error('Bucket name is required. Please set AWS_BUCKET_NAME in your environment variables.');
}

export const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: bucketName,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const uniqueSuffix = Date.now().toString();
            cb(null, `${file.fieldname}-${uniqueSuffix}-${file.originalname}`);
        },
    }),
});
