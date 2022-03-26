import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectController } from "../controllers/projectController"

const projectRouter = Router();
projectRouter.use(login_required);

projectRouter.post("/projects/project", projectController.addProject);

projectRouter.get("/projects/:id", projectController.getProject);

projectRouter.put("/projects/:id", projectController.setProject);

projectRouter.get("/projectlist/:user_id", projectController.getProjectList);

projectRouter.delete("/projects/:id", projectController.deleteProject);

export { projectRouter };
