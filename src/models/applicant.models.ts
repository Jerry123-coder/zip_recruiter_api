import { Model, Sequelize, DataTypes } from "sequelize";
import database from "../database";

const Applicant = database.define(
  "applicants",
  {
    applicant_id: {
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
    cv: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    cover_letter: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);



export default Applicant