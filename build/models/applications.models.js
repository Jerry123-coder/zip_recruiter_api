"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Applications = database_1.default.define("applications", {
    application_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    applicant_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    applicant_email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cover_letter: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_data: {
        type: sequelize_1.DataTypes.JSON,
        allowNull: false
    },
    applicantApplicantId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    jobJobId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    recruiterRecruiterId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
exports.default = Applications;
