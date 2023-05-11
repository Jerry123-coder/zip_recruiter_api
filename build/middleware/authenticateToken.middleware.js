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
Object.defineProperty(exports, "__esModule", { value: true });
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //split and takeout access token from authorization header
        // const token: any = req.headers.authorization.split(" ")[1];  
        // console.log(token);
        //token verification
        // const decode: any = await verify({ data: token });
        //pected original object assigned to the user key in the request body object
        // req.body["user"] = decode.data;
        next();
    }
    catch (e) {
        res.status(404).json({ message: e });
    }
});
exports.default = authenticateToken;
