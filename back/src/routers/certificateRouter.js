import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateController } from "../controllers/certificateController";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificates/certificate", certificateController.addCertificate);

certificateRouter.get("/certificates/:id", certificateController.getCertificate);

certificateRouter.put("/certificates/:id", certificateController.setCertificate);

certificateRouter.get("/certificatelist/:user_id", certificateController.getCertificateList
);

certificateRouter.delete('/certificates/:id', certificateController.deleteCertificate);

export { certificateRouter };
