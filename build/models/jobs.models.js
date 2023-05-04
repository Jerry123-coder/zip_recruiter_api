"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const recruiter_models_1 = __importDefault(require("./recruiter.models"));
const Jobs = database_1.default.define("jobs", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pay: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
Jobs.belongsTo(recruiter_models_1.default, {
    foreignKey: 'recruiter_id',
    as: 'recruiters'
});
exports.default = Jobs;
