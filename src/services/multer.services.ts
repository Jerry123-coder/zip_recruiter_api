import  multer from 'multer'
import path from 'path';


// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files'); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use the original filename
  },
});

// Create the Multer instance
export const upload = multer({ 
    storage,
})



