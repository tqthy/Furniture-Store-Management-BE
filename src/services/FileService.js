const s3 = require('../config/s3config');
class FileService {
  generatePresignedUrl = async(bucketName, fileName, contentType, expiresIn = 3600) => {
    const params = {
      Bucket: bucketName,
      Key: fileName, 
      Expires: expiresIn,
      ContentType: contentType, 
    };
  
    try {
      const url = await s3.getSignedUrlPromise('putObject', params);
      return url;
    } catch (error) {
      console.error('Error generating presigned URL:', error);
      throw error;
    }
  }
}

module.exports = new FileService();