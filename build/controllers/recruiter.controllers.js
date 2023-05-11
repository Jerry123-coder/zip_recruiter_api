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
exports.refreshtoken = exports.deleteJob = exports.updateJob = exports.postJob = exports.deleteProfile = exports.updateProfile = exports.signin = exports.signup = exports.generateRecruiterJobs = exports.generateRecruiters = void 0;
const express_1 = __importDefault(require("express"));
const argon = __importStar(require("argon2"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const recruiter_models_1 = __importDefault(require("../models/recruiter.models"));
const jobs_models_1 = __importDefault(require("../models/jobs.models"));
const applicant_models_1 = __importDefault(require("../models/applicant.models"));
const jwt_services_1 = require("../services/jwt.services");
const jwt_services_2 = require("../services/jwt.services");
//generate all recruiters
function generateRecruiters(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                const result = yield recruiter_models_1.default.findAll();
                return res.status(200).json({
                    success: true,
                    message: result,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).json({ message: "Error: " + e });
            }
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.generateRecruiters = generateRecruiters;
//generate all recruiter's jobs
function generateRecruiterJobs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.id);
            const result = jobs_models_1.default.findAll({ where: { recruiterRecruiterId: id } });
            res.status(200).json({
                success: true,
                job_posts: result,
            });
            console.log(result);
            // return res.status(200).json({
            //   success: true,
            //   message: "these are the jobs you've posted" + ,
            // });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
exports.generateRecruiterJobs = generateRecruiterJobs;
//generate all recruiter posted job applicants
function generateJobApplicants(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.params.recruiter_id);
            const result = yield applicant_models_1.default.findAll({ where: { id: id } });
            res.status(200).json({
                success: true,
                users: result,
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({ message: console.log(e), success: false });
        }
    });
}
//1. recruiter sign up
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                const { name, email, password, confirmPassword, organization } = req.body;
                if (!name || !email || !password || !confirmPassword || !organization) {
                    return res.status(400).json({
                        success: false,
                        message: "Name, email or password not inputed",
                    });
                }
                if (password !== confirmPassword) {
                    return res.status(400).json({
                        success: false,
                        message: "Passwords don't match, please try again",
                    });
                }
                //input validity confirmed, now we hash the password with argon
                const hash = yield argon.hash(password);
                const newUser = { name, email, password: hash, organization };
                const result = yield recruiter_models_1.default.create(newUser);
                const signedupUser = result;
                return res.status(200).json({
                    success: true,
                    message: "Recruiter account created successfully",
                    data: signedupUser,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).json({
                    success: false,
                    message: "Account not created",
                    data: "Error:" + e,
                });
            }
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
            const { email, password } = req.body;
            if (!password || !email) {
                return res.status(400).json({
                    success: false,
                    message: " email or password required",
                });
            }
            const user = yield recruiter_models_1.default.findOne({ where: { email: email } });
            if (!user)
                return res.status(400).json({
                    success: false,
                    message: "Login unsuccessful, no such user",
                });
            // verify user password and generate access and refresh tokens
            console.log(user);
            const verify = yield argon.verify(user.password, password);
            console.log({ verify, passwords: { db: user.password, password } });
            if (!verify)
                return res.status(400).json({
                    success: false,
                    message: "Invalid password",
                    data: express_1.default,
                });
            const { accessToken, refreshToken } = yield (0, jwt_services_1.generate)({
                data: { email: user.email, name: user.name, id: user.recruiter_id },
            });
            const tokens = {
                accessToken: accessToken,
                refreshToken: refreshToken,
            };
            res.status(200).json({
                success: true,
                message: "signin successful",
                accessToken,
                refreshToken,
                data: user,
            });
        }
        catch (e) {
            console.error(e);
            return res.status(400).json({
                success: false,
                message: "Login unsuccessful",
                data: console.log(e),
            });
        }
    });
}
exports.signin = signin;
//3. update recruiter profile
function updateProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.body.recruiter_id);
            var newRecruiterData = req.body;
            const update = yield recruiter_models_1.default.update({
                name: newRecruiterData.name,
                email: newRecruiterData.email,
                password: newRecruiterData.password,
                organization: newRecruiterData.organization,
            }, {
                where: { recruiter_id: id },
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
            const id = Number(req.body.recruiter_id);
            yield recruiter_models_1.default.destroy({
                where: { recruiter_id: id },
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
            const id = Number(req.body.recruiterRecruiterId);
            var updatedJobData = req.body;
            const update = yield jobs_models_1.default.update({
                job_id: updatedJobData.job_id,
                job_title: updatedJobData.job_title,
                job_location: updatedJobData.job_location,
                job_description: updatedJobData.job_description,
                pay: updatedJobData.pay,
            }, {
                where: { recruiterRecruiterId: id },
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
            const id = Number(req.body.job_id);
            yield jobs_models_1.default.destroy({
                where: { job_id: id },
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
function refreshtoken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { refreshtoken } = req.body;
            if (!refreshtoken) {
                return res.status(404).json({ message: "unauthorized" });
            }
            const verifytoken = yield (0, jwt_services_2.verify)({
                data: refreshtoken,
                isRefresh: true,
            });
            // const {accessToken} = await generate({data:{name: verifytoken.data.name, email: verifytoken.data.email, id: verifytoken.data.id}})
            return res.status(200);
            // .json({ success: true, message: "User query successful", data:{ tokens: {accessToken, refreshToken: refreshtoken }}});
        }
        catch (error) {
            console.error({ 2: express_1.default });
            return res.status(404).json({ message: "unauthorized" });
        }
    });
}
exports.refreshtoken = refreshtoken;
