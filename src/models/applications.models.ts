import { Model, Sequelize, DataTypes } from "sequelize";
import database from "../database";
import Recruiter from "./recruiter.models";

const Applications = database.define(
  "applications",
  {
    application_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    applicant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicant_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover_letter: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_data: {
        type:DataTypes.JSON,
        allowNull: false
    },
    applicantApplicantId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jobJobId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      recruiterRecruiterId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

export default Applications;
