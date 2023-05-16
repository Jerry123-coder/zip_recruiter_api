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
exports.application = exports.deleteApplicantProfile = exports.updateApplicantProfile = exports.applicantSignin = exports.applicantSignup = void 0;
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const argon2_1 = __importDefault(require("argon2"));
dotenv.config();
const applicant_models_1 = __importDefault(require("../models/applicant.models"));
const jobs_models_1 = __importDefault(require("../models/jobs.models"));
const jwt_services_1 = require("../services/jwt.services");
//1. applicant sign up
function applicantSignup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                const { name, email, password, confirmPassword, cv, coverLetter } = req.body;
                if (!name || !email || !password || !confirmPassword) {
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
                const hash = yield argon2_1.default.hash(password);
                const newUser = { name, email, password: hash, cv, coverLetter };
                const result = yield applicant_models_1.default.create(newUser);
                const signedupUser = result;
                return res.status(200).json({
                    success: true,
                    message: "Applicant account created successfully",
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
exports.applicantSignup = applicantSignup;
//2. applicant signin
function applicantSignin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                const { email, password } = req.body;
                if (!password || !email) {
                    return res
                        .status(400)
                        .json({
                        success: false,
                        message: " email or password required"
                    });
                }
                const user = yield applicant_models_1.default.findOne({ where: { email: email } });
                if (!user)
                    return res
                        .status(400)
                        .json({
                        success: false,
                        message: "Login unsuccessful, no such user"
                    });
                // verify user password and generate access and refresh tokens
                console.log(user);
                const verify = yield argon2_1.default.verify(user.password, password);
                console.log({ verify, passwords: { db: user.password, password } });
                if (!verify)
                    return res.status(400).json({
                        success: false,
                        message: "Invalid password",
                        data: express_1.default,
                    });
                const { accessToken, refreshToken } = yield (0, jwt_services_1.generate)({
                    data: { email: user.email, name: user.name, id: user.applicant_id },
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
            const id = Number(req.body.applicant_id);
            var updatedApplicantData = req.body;
            const update = yield applicant_models_1.default.update({
                name: updatedApplicantData.name,
                email: updatedApplicantData.email,
                password: updatedApplicantData.password,
                cv: updatedApplicantData.cv,
                cover_letter: updatedApplicantData.cover_letter
            }, {
                where: { applicant_id: id },
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
exports.updateApplicantProfile = updateApplicantProfile;
//4. delete applicant account
function deleteApplicantProfile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = Number(req.body.applicant_id);
            yield applicant_models_1.default.destroy({
                where: { applicant_id: id },
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
exports.deleteApplicantProfile = deleteApplicantProfile;
//jobs
// 5. search jobs
// async function jobs(req: Request, res: Response, next: NextFunction) {
//   try {
//     const result = await Jobs.findAll();
//     res.status(200).json({ 
//       success: true,
//       jobs: result 
//     });
//     return res.status(200).json({
//       success: true,
//       message: "these are the available jobs",
//     });
//   } catch (e) {
//     console.error(e);
//     return res.status(400).json({ message: console.log(e), success: false });
//   }
// }
// 6. apply for job
function application(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            try {
                var newJobApplication = req.body;
                const result = yield jobs_models_1.default.create(newJobApplication);
                newJobApplication = result.dataValues;
                return res.status(200).json({
                    success: true,
                    message: newJobApplication,
                });
            }
            catch (e) {
                console.error(e);
                res.status(404).json({ message: "Error: " + e });
            }
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
