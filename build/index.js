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
const multer_services_1 = require("./services/multer.services");
const path_1 = __importDefault(require("path"));
const port = 9000;
const app = (0, express_1.default)();
//Make static directory public
// app.use("/files", express.static("files"));
app.use("/files", express_1.default.static(path_1.default.join(__dirname, "./files")));
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
//routes
app.use(routes_1.default);
app.post("/upload", (req, res, next) => {
    console.log({ body: req.body });
    next();
}, multer_services_1.upload.single("cv"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
    }
    // Process the uploaded file (e.g., save it to the database, perform further operations)
    res.status(200).json({ message: "File uploaded successfully" });
});
app.post("/upload", multer_services_1.upload.single("cover"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file provided" });
    }
    // Process the uploaded file (e.g., save it to the database, perform further operations)
    res.status(200).json({ message: "File uploaded successfully" });
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    (0, associations_models_1.recruiterJobs)();
    (0, associations_models_1.jobApplications)();
    yield (0, dbConnection_1.dbConnection)();
    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
});
start();
