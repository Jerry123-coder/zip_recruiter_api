"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Jobs = database_1.default.define("jobs", {
    job_id: {
        type: sequelize_1.DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
    },
    job_title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    organization: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_location: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    job_type: {
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
exports.default = Jobs;
