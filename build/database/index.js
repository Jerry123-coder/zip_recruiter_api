"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = require("../config/config");
exports.default = new sequelize_1.Sequelize(config_1.db_production, {
    // host: db_host,
    dialect: "postgres",
});
