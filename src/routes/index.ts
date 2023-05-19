import { Router } from "express";
import authenticateToken from "../middleware/authenticateToken.middleware";
import applicantRouter from "./applicants.routes";
import recruiterRouter from "./recruiters.routes";
import { uploadRouter } from "./uploads.routes";

const routes = Router();

routes.use("/applicants", applicantRouter);
routes.use("/recruiters", recruiterRouter);
routes.use("/uploads", authenticateToken, uploadRouter);
// routes.use('/dashboard',  dashboardRouter);
// routes.use('/delivery',  deliveryRouter);
// routes.use('/analytics',  analyticsRouter);
export default routes;
