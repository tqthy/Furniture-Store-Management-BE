import FileService from '../services/FileService';

class FileController {
  getPresignedUrl = async (req, res) => {
    const { fileName } = req.query; // Pass the file name as a query parameter
    const bucketName = process.env.AWS_BUCKET_NAME; 
  
    try {
      const url = await FileService.generatePresignedUrl(bucketName, `uploads/${fileName}`);
      res.json({ presignedUrl: url });
    } catch (error) {
      res.status(500).json({ error: 'Could not generate presigned URL' });
    }
  }
}
module.exports = new FileController(); 