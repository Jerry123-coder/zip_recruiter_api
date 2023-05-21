"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const recruiter_controllers_1 = require("../controllers/recruiter.controllers");
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const recruiterRouter = (0, express_1.Router)();
//recruiters
recruiterRouter.get("/all", recruiter_controllers_1.generateRecruiters);
recruiterRouter.get("/recruiter's_jobs/:id", recruiter_controllers_1.generateRecruiterJobs);
//recruiter account
recruiterRouter.post("/signup", recruiter_controllers_1.signup);
recruiterRouter.post("/signin", recruiter_controllers_1.signin);
recruiterRouter.put("/update_profile", authenticateToken_middleware_1.default, recruiter_controllers_1.updateProfile);
recruiterRouter.delete("/delete_profile", authenticateToken_middleware_1.default, recruiter_controllers_1.deleteProfile);
//jobs
recruiterRouter.post("/post_job", authenticateToken_middleware_1.default, recruiter_controllers_1.postJob);
recruiterRouter.put("/update_job", authenticateToken_middleware_1.default, recruiter_controllers_1.updateJob);
recruiterRouter.get("/applicants/:id", recruiter_controllers_1.generateApplicants);
recruiterRouter.put("/manage_applicant", authenticateToken_middleware_1.default, recruiter_controllers_1.manageApplicants);
recruiterRouter.get("/get_file", authenticateToken_middleware_1.default, recruiter_controllers_1.getfile);
recruiterRouter.delete("/delete_applicant/:id", authenticateToken_middleware_1.default, recruiter_controllers_1.deleteApplicants);
recruiterRouter.delete("/delete_job/:id", authenticateToken_middleware_1.default, recruiter_controllers_1.deleteJob);
exports.default = recruiterRouter;
