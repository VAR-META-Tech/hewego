import {Injectable} from "@nestjs/common";
import {S3} from "aws-sdk";

@Injectable()
export class S3Handler {
    async upload(folder: string, file: any): Promise<any> {
        const {originalname} = file;
        const bucketS3 = process.env.AWS_BUCKET;
        return await this.uploadS3(file.buffer, bucketS3, folder, originalname);
    }

    async delete(folder: string, name: string): Promise<any> {
        const bucketS3 = process.env.AWS_BUCKET;
        return await this.deleteS3(bucketS3, folder, name);
    }

    // append timestamp at the end of file name
    private async uploadS3(
        file: any,
        bucket: string,
        folder: string,
        name: string
    ) {
        const s3 = this.getS3();
        const timestamp = Date.now();

        const params = {
            Bucket: bucket,
            Key: `${folder}/${String(name)}_${timestamp}`,
            Body: file,
        };

        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    console.log("S3 eror: ", err);
                    reject(err.message);
                }
                return resolve(data);
            });
        });
    }

    private getS3() {
        return new S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        });
    }

    private async deleteS3(
        bucket: string,
        folder: string,
        name: string
    ) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: `${folder}/${String(name)}`,
        };

        return new Promise((resolve, reject) => {
            s3.deleteObject(params, (err, data) => {
                if (err) reject(err);
                else return resolve(data);
            });
        });
    }
}
