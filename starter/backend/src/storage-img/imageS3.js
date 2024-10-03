import {PutObjectCommand, S3Client} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

const s3ClientObj = new S3Client();
const atcS3 = process.env.TODO_ATTACHMENTS_S3_BUCKET
const urlExp = parseInt(process.env.SIGNED_URL_EXPIRATION)

export async function pushImgToS3(imgId) {
    const command = new PutObjectCommand({
        Bucket: atcS3,
        Key: imgId
    })
    return await getSignedUrl(s3ClientObj, command, {
        expiresIn: urlExp
    })
}