"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recruiter_controllers_1 = require("../controllers/recruiter.controllers");
const recruiterRouter = (0, express_1.Router)();
//recruiters
recruiterRouter.get("/all", recruiter_controllers_1.generateRecruiters);
recruiterRouter.get("/recruiter's_jobs/:id", recruiter_controllers_1.generateRecruiterJobs);
//recruiter account
recruiterRouter.post("/signup", recruiter_controllers_1.signup);
recruiterRouter.post("/signin", recruiter_controllers_1.signin);
recruiterRouter.put("/update_profile", recruiter_controllers_1.updateProfile);
recruiterRouter.delete("/delete_profile", recruiter_controllers_1.deleteProfile);
//jobs
recruiterRouter.post("/post_job", recruiter_controllers_1.postJob);
recruiterRouter.put("/update_job", recruiter_controllers_1.updateJob);
recruiterRouter.delete("/delete_job", recruiter_controllers_1.deleteJob);
exports.default = recruiterRouter;
