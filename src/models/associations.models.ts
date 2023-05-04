import Applicant from "./applicant.models";
import Jobs from "./jobs.models";
import Recruiter from "./recruiter.models";

export const recruiterJobs = () => {
    Recruiter.hasMany( Jobs);
      
      Jobs.belongsTo(Recruiter)
}

export const jobApplications = () => {
    Applicant.belongsToMany(Jobs, { through: 'job_applications' });
    Jobs.belongsToMany(Applicant, { through: 'job_applications' });
}