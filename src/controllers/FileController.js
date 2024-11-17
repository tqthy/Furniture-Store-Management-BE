// import FileService from '../services/FileService';
// const { v4: uuidv4 } = require('uuid');
// class FileController {
//   getPresignedUrl = async (req, res) => {
//     const { fileName, contentType } = req.query;
//     const bucketName = process.env.AWS_BUCKET_NAME;
//     const uniqueFileName = `uploads/${Date.now()}-${uuidv4()}-${fileName}`;

//     try {
//       const url = await FileService.generatePresignedUrl(bucketName, uniqueFileName, contentType);
//       res.json({ presignedUrl: url, key: uniqueFileName }); // Return the unique file name for reference
//     } catch (error) {
//       res.status(500).json({ error: 'Could not generate presigned URL' });
//     }
//   }
// }

// module.exports = new FileController();