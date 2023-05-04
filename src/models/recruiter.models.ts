import { Model, Sequelize, DataTypes } from "sequelize";
import database from "../database";
import Jobs from "./jobs.models";

const Recruiter = database.define(
  "recruiters",
  {
    recruiter_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    organization: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);



export default Recruiter