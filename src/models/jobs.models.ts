import { Model, Sequelize, DataTypes } from "sequelize";
import database from "../database";
import Recruiter from "./recruiter.models";

const Jobs = database.define(
  "jobs",
  {
    job_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    job_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    job_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    pay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);


export default Jobs