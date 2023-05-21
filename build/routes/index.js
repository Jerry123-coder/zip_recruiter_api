"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticateToken_middleware_1 = __importDefault(require("../middleware/authenticateToken.middleware"));
const applicants_routes_1 = __importDefault(require("./applicants.routes"));
const recruiters_routes_1 = __importDefault(require("./recruiters.routes"));
const uploads_routes_1 = require("./uploads.routes");
const routes = (0, express_1.Router)();
routes.use("/applicants", applicants_routes_1.default);
routes.use("/recruiters", recruiters_routes_1.default);
routes.use("/uploads", authenticateToken_middleware_1.default, uploads_routes_1.uploadRouter);
// routes.use('/dashboard',  dashboardRouter);
// routes.use('/delivery',  deliveryRouter);
// routes.use('/analytics',  analyticsRouter);
exports.default = routes;
