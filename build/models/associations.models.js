"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobsApplied = exports.jobApplications = exports.recruiterJobs = void 0;
const applicant_models_1 = __importDefault(require("./applicant.models"));
const applications_models_1 = __importDefault(require("./applications.models"));
const jobs_models_1 = __importDefault(require("./jobs.models"));
const recruiter_models_1 = __importDefault(require("./recruiter.models"));
const recruiterJobs = () => {
    recruiter_models_1.default.hasMany(jobs_models_1.default);
    jobs_models_1.default.belongsTo(recruiter_models_1.default);
};
exports.recruiterJobs = recruiterJobs;
const jobApplications = () => {
    // Applications.belongsTo(Jobs, { foreignKey: 'job_id' });
    // Applications.belongsTo(Applicant, { foreignKey: 'applicant_id' });
    // Applications.belongsTo(Recruiter);
    // Recruiter.hasMany(Applications)
    jobs_models_1.default.hasMany(applications_models_1.default);
    applicant_models_1.default.hasMany(applications_models_1.default);
    applications_models_1.default.belongsTo(jobs_models_1.default);
    applications_models_1.default.belongsTo(applicant_models_1.default);
};
exports.jobApplications = jobApplications;
const jobsApplied = () => {
    applicant_models_1.default.belongsToMany(jobs_models_1.default, { through: 'job_applications' });
    jobs_models_1.default.belongsToMany(applicant_models_1.default, { through: 'job_applications' });
};
exports.jobsApplied = jobsApplied;
