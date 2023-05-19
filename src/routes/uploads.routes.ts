import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Applicant from "../models/applicant.models";
import { where } from "sequelize/types/sequelize";

const uploadRouter = Router();

// const __filename = fileURLToPath(path.join(__dirname, "../files"));
// const directory = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { destination } = req.query;
    cb(null, path.join(__dirname, `../files/${destination}`)); // Define the destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    // console.log({ user: req.body.user });
    const { email } = req.query;
    const fileName = email + ".pdf"; // Use the name from the request along with the original filename

    cb(null, fileName);
  },
});

// Create the Multer instance
const upload = multer({ storage });

uploadRouter.post("/cv", upload.single("cv"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  // Process the uploaded file (e.g., save it to the database, perform further operations)
  const { email } = req.query;
  const filename = "http://localhost:9000/files/cv/" + email + ".pdf";

  Applicant.update({ cv: filename }, { where: { email: email } })
    .then(() => res.status(200).json({ message: "File uploaded successfully" }))
    .catch(() =>
      res.status(400).json({ message: "File uploaded unsuccessfully" })
    );
});

uploadRouter.post("/cover", upload.single("cover"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  // Process the uploaded file (e.g., save it to the database, perform further operations)
  const { email } = req.query;
  const filename = "http://localhost:9000/files/cover/" + email + ".pdf";

  Applicant.update({ cover_letter: filename }, { where: { email: email } })
    .then(() => res.status(200).json({ message: "File uploaded successfully" }))
    .catch(() =>
      res.status(400).json({ message: "File uploaded unsuccessfully" })
    );

  res.status(200).json({ message: "File uploaded successfully" });
});

export { uploadRouter };
