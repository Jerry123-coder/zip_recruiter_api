import {  Router } from "express";
import { get } from "http";
import { applicantSignin, applicantSignup, application, deleteApplicantProfile, generateJobsApplied, jobs, searchjobs, updateApplicantProfile } from "../controllers/applicant.controllers";
import authenticateToken from "../middleware/authenticateToken.middleware";
import { upload } from "../services/multer.services";

;

const applicantRouter = Router();

//applicant data
applicantRouter.post("/signup",  applicantSignup);
applicantRouter.post("/signin",  applicantSignin);
applicantRouter.put("/update_profile", authenticateToken, updateApplicantProfile)
applicantRouter.delete("/delete_profile", authenticateToken, deleteApplicantProfile)

//jobs
applicantRouter.get("/jobs", jobs);
applicantRouter.get("/search_jobs", authenticateToken, searchjobs);
applicantRouter.post("/application", authenticateToken, application);
applicantRouter.get("/applications/:id", authenticateToken, generateJobsApplied); 

// applicantRouter.post('/upload', upload.single('pdf'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file provided' });
//     }
//     // Process the uploaded file (e.g., save it to the database, perform further operations)
//     console.log(req.file)
//     res.status(200).json({ message: 'File uploaded successfully' });
//   });

export default applicantRouter;