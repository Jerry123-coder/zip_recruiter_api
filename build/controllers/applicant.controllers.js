"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.application = exports.jobs = exports.deleteApplicantProfile = exports.updateApplicantProfile = exports.applicantSignin = exports.applicantSignup = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//1. applicant sign up
function applicantSignup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "signup successful",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.applicantSignup = applicantSignup;
//2. applicant signin
function applicantSignin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.status(200).json({
                success: true,
                message: "signin successful",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.applicantSignin = applicantSignin;
//3. update applicant profile
function updateApplicantProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "update successful",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.updateApplicantProfile = updateApplicantProfile;
//4. delete recruiter account
function deleteApplicantProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "profile deleted successfully",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.deleteApplicantProfile = deleteApplicantProfile;
//jobs
// 5. search jobs
function jobs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "these are the available jobs",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.jobs = jobs;
// 6. apply for job
function application(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "applied successfully",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.application = application;
