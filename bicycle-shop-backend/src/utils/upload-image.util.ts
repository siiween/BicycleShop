import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from '@config/aws-s3';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

export const uploadImage = async (file: Express.Multer.File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided for upload');
    }

    const useMock = process.env.MOCK_AWS === 'true';
    const fileExtension = file.originalname.split('.').pop();
    const key = `${uuidv4()}.${fileExtension}`;

    if (useMock) {
        const uploadsDir = path.resolve(__dirname, '../../uploads/products');
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }

        const filePath = path.join(uploadsDir, key);
        fs.writeFileSync(filePath, file.buffer);

        return `${process.env.BACKEND_URL ?? "http://localhost"}:${process.env.PORT}/uploads/products/${key}`;
    } else {
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
    }
};
