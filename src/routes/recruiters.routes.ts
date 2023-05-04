import { Router } from "express";
import { get } from "http";
import { signup, signin, updateProfile, deleteProfile, postJob, updateJob, deleteJob, generateRecruiters, generateRecruiterJobs } from "../controllers/recruiter.controllers";



const recruiterRouter = Router();

//recruiters
recruiterRouter.get("/all",  generateRecruiters);
recruiterRouter.get("/recruiter's_jobs/:id",  generateRecruiterJobs);

//recruiter account
recruiterRouter.post("/signup",  signup);
recruiterRouter.post("/signin",  signin);
recruiterRouter.put("/update_profile", updateProfile)
recruiterRouter.delete("/delete_profile", deleteProfile)

//jobs
recruiterRouter.post("/post_job",  postJob);
recruiterRouter.put("/update_job",  updateJob);
recruiterRouter.delete("/delete_job",  deleteJob);




export default recruiterRouter;