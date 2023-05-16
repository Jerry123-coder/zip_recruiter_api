"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicant_controllers_1 = require("../controllers/applicant.controllers");
;
const applicantRouter = (0, express_1.Router)();
//applicant data
applicantRouter.post("/signup", applicant_controllers_1.applicantSignup);
applicantRouter.post("/signin", applicant_controllers_1.applicantSignin);
applicantRouter.put("/update_profile", applicant_controllers_1.updateApplicantProfile);
applicantRouter.delete("/delete_profile", applicant_controllers_1.deleteApplicantProfile);
//jobs
// applicantRouter.get("/jobs",  jobs);
applicantRouter.post("/application", applicant_controllers_1.application);
exports.default = applicantRouter;
