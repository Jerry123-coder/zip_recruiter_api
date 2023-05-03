import {  Router } from "express";
import { get } from "http";
import { applicantSignin, applicantSignup, application, deleteApplicantProfile, jobs, updateApplicantProfile } from "../controllers/applicant.controllers";

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



export default applicantRouter;