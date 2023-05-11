"use strict";
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
exports.verify = exports.generate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const generate = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //generate access token using the jwt_secret we created
        const accessToken = yield jsonwebtoken_1.default.sign(Object.assign({}, data), config_1.jwt_secret, {
            expiresIn: "6h",
        });
        //generate refresh token using the jwt_refresh_secret we created
        const refreshToken = yield jsonwebtoken_1.default.sign(Object.assign({}, data), config_1.jwt_refresh_secret, {
            expiresIn: "1d",
        });
        return { accessToken, refreshToken };
    }
    catch (e) {
        console.error(e);
        return null;
    }
});
exports.generate = generate;
const verify = ({ data, isRefresh = false, }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //verify the token received from the user using access token or refresh token
        const token = yield jsonwebtoken_1.default.verify(data, isRefresh ? config_1.jwt_refresh_secret : config_1.jwt_secret);
        return token;
    }
    catch (e) {
        console.error(e);
        throw e;
    }
});
exports.verify = verify;
