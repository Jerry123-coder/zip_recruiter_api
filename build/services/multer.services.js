"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
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
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path_1.default.join(__dirname, "../files")); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        console.log({ user: req.body.user });
        const { email } = req.body.user;
        const fileName = req.body.user.email + ".pdf"; // Use the name from the request along with the original filename
        cb(null, fileName);
    },
});
// Create the Multer instance
exports.upload = (0, multer_1.default)({ storage });
