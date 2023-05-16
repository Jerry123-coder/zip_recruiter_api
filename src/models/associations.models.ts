import Applicant from "./applicant.models";
import Applications from "./applications.models";
import Jobs from "./jobs.models";
import Recruiter from "./recruiter.models";

export const recruiterJobs = () => {
  Recruiter.hasMany(Jobs);

  Jobs.belongsTo(Recruiter);
};

export const jobApplications = () => {
  // Applications.belongsTo(Jobs, { foreignKey: 'job_id' });
  // Applications.belongsTo(Applicant, { foreignKey: 'applicant_id' });
  // Applications.belongsTo(Recruiter);
  // Recruiter.hasMany(Applications)
  Jobs.hasMany(Applications);
  Applicant.hasMany(Applications);

  Applications.belongsTo(Jobs);
  Applications.belongsTo(Applicant);
};

export const jobsApplied = () => {
    Applicant.belongsToMany(Jobs, { through: 'job_applications' });
    Jobs.belongsToMany(Applicant, { through: 'job_applications' });
}
