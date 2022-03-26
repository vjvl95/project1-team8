import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardController } from "../controllers/awardController";

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/awards/award", awardController.addAward);
  
awardRouter.get("/awards/:id", awardController.getAward);

awardRouter.put("/awards/:id", awardController.setAward);

awardRouter.get("/awardlist/:user_id", awardController.getAwardList
);

awardRouter.delete("/awards/:id", awardController.deleteAward);

export { awardRouter };
