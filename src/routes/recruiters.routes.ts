import { Router } from "express";
import { get } from "http";
import { signup, signin, updateProfile, deleteProfile, postJob, updateJob, deleteJob, generateRecruiters, generateRecruiterJobs, generateApplicants, manageApplicants, deleteApplicants, getfile } from "../controllers/recruiter.controllers";
import authenticateToken from "../middleware/authenticateToken.middleware";



const recruiterRouter = Router();

//recruiters
recruiterRouter.get("/all",  generateRecruiters);
recruiterRouter.get("/recruiter's_jobs/:id",  generateRecruiterJobs);

//recruiter account
recruiterRouter.post("/signup",  signup);
recruiterRouter.post("/signin",  signin);
recruiterRouter.put("/update_profile", authenticateToken, updateProfile)
recruiterRouter.delete("/delete_profile", authenticateToken, deleteProfile)

//jobs
recruiterRouter.post("/post_job", authenticateToken, postJob);
recruiterRouter.put("/update_job", authenticateToken, updateJob); 
recruiterRouter.get("/applicants/:id", generateApplicants);
recruiterRouter.put("/manage_applicant", authenticateToken, manageApplicants);
recruiterRouter.get("/get_file", authenticateToken, getfile);
recruiterRouter.delete("/delete_applicant/:id", authenticateToken, deleteApplicants);
recruiterRouter.delete("/delete_job/:id", authenticateToken, deleteJob);




export default recruiterRouter;