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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dbConnection_1 = require("./database/dbConnection");
const routes_1 = __importDefault(require("./routes"));
const associations_models_1 = require("./models/associations.models");
const port = 9000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//routes
app.use(routes_1.default);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, associations_models_1.recruiterJobs)();
    (0, associations_models_1.jobApplications)();
    yield (0, dbConnection_1.dbConnection)();
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
start();
