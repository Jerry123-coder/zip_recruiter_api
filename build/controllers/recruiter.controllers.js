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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJob = exports.updateJob = exports.postJob = exports.deleteProfile = exports.updateProfile = exports.signin = exports.signup = void 0;
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const recruiter_models_1 = __importDefault(require("../models/recruiter.models"));
const jobs_models_1 = __importDefault(require("../models/jobs.models"));
//1. recruiter sign up
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                var newUser = req.body;
                const result = yield recruiter_models_1.default.create(newUser);
                newUser = result.dataValues;
                return res.status(200).json({
                    success: true,
                    message: newUser,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).json({ message: "Error: " + e });
            }
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
            const id = Number(req.params.id);
            const name = req.params.name;
            var newUserData = req.body;
            const update = yield recruiter_models_1.default.update({
                name: newUserData.name,
                box: newUserData.box,
                phone: newUserData.phone,
                email: newUserData.email
            }, {
                where: { id: id },
            });
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
            const id = Number(req.params.id);
            yield recruiter_models_1.default.destroy({
                where: { id: id },
            });
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
            try {
                var newJob = req.body;
                const result = yield jobs_models_1.default.create(newJob);
                newJob = result.dataValues;
                return res.status(200).json({
                    success: true,
                    message: newJob,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).json({ message: "Error: " + e });
            }
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
            const id = Number(req.params.id);
            const name = req.params.name;
            var newUserData = req.body;
            const update = yield jobs_models_1.default.update({
                name: newUserData.name,
                box: newUserData.box,
                phone: newUserData.phone,
                email: newUserData.email
            }, {
                where: { id: id },
            });
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
            const id = Number(req.params.id);
            yield jobs_models_1.default.destroy({
                where: { id: id },
            });
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
