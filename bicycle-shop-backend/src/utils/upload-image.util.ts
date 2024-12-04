import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@config/aws-s3';
import { v4 as uuidv4 } from 'uuid';

export const uploadImageToS3 = async (file: Express.Multer.File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    const params = {
        Bucket: process.env.AWS_BUCKET_NAME as string,
        Key: key,
        Body: file.buffer,
        ContentType: file.mimetype,
    };

    try {
        await s3Client.send(new PutObjectCommand(params));
        return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
    } catch (error: any) {
        console.error('S3 Upload Error:', error);
        throw new Error('Failed to upload image');
    }
};
