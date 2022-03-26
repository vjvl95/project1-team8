import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { educationController } from "../controllers/educationController";

const educationRouter = Router();
educationRouter.use(login_required);

educationRouter.post("/educations/education", educationController.addEducation);

educationRouter.get('/educations/:id', educationController.getEducation);

educationRouter.put('/educations/:id', educationController.setEducation);

educationRouter.get('/educationlist/:user_id', educationController.getEducationList);

educationRouter.delete('/educations/:id', educationController.deleteEducation);

export { educationRouter };
