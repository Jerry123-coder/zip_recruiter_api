"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadRouter = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const applicant_models_1 = __importDefault(require("../models/applicant.models"));
const uploadRouter = (0, express_1.Router)();
exports.uploadRouter = uploadRouter;
// const __filename = fileURLToPath(path.join(__dirname, "../files"));
// const directory = dirname(__filename);
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const { destination } = req.query;
        cb(null, path_1.default.join(__dirname, `../files/${destination}`)); // Define the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        // console.log({ user: req.body.user });
        const { email } = req.query;
        const fileName = email + ".pdf"; // Use the name from the request along with the original filename
        cb(null, fileName);
    },
});
// Create the Multer instance
const upload = (0, multer_1.default)({ storage });
uploadRouter.post("/cv", upload.single("cv"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
    }
    // Process the uploaded file (e.g., save it to the database, perform further operations)
    const { email } = req.query;
    const filename = "http://localhost:9000/files/cv/" + email + ".pdf";
    applicant_models_1.default.update({ cv: filename }, { where: { email: email } })
        .then(() => res.status(200).json({ message: "File uploaded successfully" }))
        .catch(() => res.status(400).json({ message: "File uploaded unsuccessfully" }));
});
uploadRouter.post("/cover", upload.single("cover"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
    }
    // Process the uploaded file (e.g., save it to the database, perform further operations)
    const { email } = req.query;
    const filename = "http://localhost:9000/files/cover/" + email + ".pdf";
    applicant_models_1.default.update({ cover_letter: filename }, { where: { email: email } })
        .then(() => res.status(200).json({ message: "File uploaded successfully" }))
        .catch(() => res.status(400).json({ message: "File uploaded unsuccessfully" }));
    res.status(200).json({ message: "File uploaded successfully" });
});
