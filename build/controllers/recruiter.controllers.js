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
exports.deleteJob = exports.updateJob = exports.postJob = exports.deleteProfile = exports.updateProfile = exports.signin = exports.signup = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
//1. recruiter sign up
function signup(req, res, next) {
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
exports.signup = signup;
//2. recruiter signin
function signin(req, res, next) {
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
exports.signin = signin;
//3. update recruiter profile
function updateProfile(req, res, next) {
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
exports.updateProfile = updateProfile;
//4. delete recruiter account
function deleteProfile(req, res, next) {
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
exports.deleteProfile = deleteProfile;
//jobs
// 5. post new job
function postJob(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "job posted successfully",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.postJob = postJob;
// 6. update job
function updateJob(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "job updated successfully",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.updateJob = updateJob;
// 6. delete job
function deleteJob(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return res.status(200).json({
                success: true,
                message: "job deleted successfully",
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.deleteJob = deleteJob;
