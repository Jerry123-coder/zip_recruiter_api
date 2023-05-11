"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../database"));
const Applicant = database_1.default.define("applicants", {
    applicant_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    cv: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    cover_letter: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
}, {
    freezeTableName: true,
    timestamps: true,
});
exports.default = Applicant;
