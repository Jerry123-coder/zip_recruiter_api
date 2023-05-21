"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const applicant_controllers_1 = require("../controllers/applicant.controllers");
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
;
const applicantRouter = (0, express_1.Router)();
//applicant data
applicantRouter.post("/signup", applicant_controllers_1.applicantSignup);
applicantRouter.post("/signin", applicant_controllers_1.applicantSignin);
applicantRouter.put("/update_profile", authenticateToken_middleware_1.default, applicant_controllers_1.updateApplicantProfile);
applicantRouter.delete("/delete_profile", authenticateToken_middleware_1.default, applicant_controllers_1.deleteApplicantProfile);
//jobs
applicantRouter.get("/jobs", applicant_controllers_1.jobs);
applicantRouter.get("/search_jobs", authenticateToken_middleware_1.default, applicant_controllers_1.searchjobs);
applicantRouter.post("/application", authenticateToken_middleware_1.default, applicant_controllers_1.application);
applicantRouter.get("/applications/:id", authenticateToken_middleware_1.default, applicant_controllers_1.generateJobsApplied);
// applicantRouter.post('/upload', upload.single('pdf'), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file provided' });
//     }
//     // Process the uploaded file (e.g., save it to the database, perform further operations)
//     console.log(req.file)
//     res.status(200).json({ message: 'File uploaded successfully' });
//   });
exports.default = applicantRouter;
