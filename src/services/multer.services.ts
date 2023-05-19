import multer from "multer";
import path from "path";

// Configure Multer storage

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../files")); // Define the destination folder for uploaded files
//   },
//   filename: function (req, file, cb) {
//     console.log({ fileuploadrequest: req.body.user });
//     // cb(null, Date.now() + path.extname(file.originalname)); // Use the original filename
//     // cb(null, req.body.email + "-cv.pdf"); // Use the original filename
//     cb(null,
//         req.body.email + "-cv.pdf"); // Use the original filename
//   },
// });

// // Create the Multer instance
// export const upload = multer({
//   storage,
// });

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../files")); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    console.log({ user: req.body.user });
    const {email} = req.body.user
    const fileName = req.body.user.email + ".pdf"; // Use the name from the request along with the original filename
    
    cb(null, fileName);
  },
});

// Create the Multer instance
export const upload = multer({ storage });
