import {  Router } from "express";
import { get } from "http";
import { applicantSignin, applicantSignup, application, deleteApplicantProfile, generateJobsApplied, jobs, updateApplicantProfile } from "../controllers/applicant.controllers";
import { upload } from "../services/multer.services";

;

const applicantRouter = Router();

//applicant data
applicantRouter.post("/signup",  applicantSignup);
applicantRouter.post("/signin",  applicantSignin);
applicantRouter.put("/update_profile", updateApplicantProfile)
applicantRouter.delete("/delete_profile", deleteApplicantProfile)

//jobs
applicantRouter.get("/jobs",  jobs);
applicantRouter.post("/application",  application);
applicantRouter.get("/applications/:id",  generateJobsApplied); 

// applicantRouter.post('/upload', upload.single('pdf'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file provided' });
//     }
//     // Process the uploaded file (e.g., save it to the database, perform further operations)
//     console.log(req.file)
//     res.status(200).json({ message: 'File uploaded successfully' });
//   });

export default applicantRouter;