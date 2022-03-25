import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";
import { headerError } from "../utils/errorMessages"

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/awards/award", async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error( 
          headerError
        );
      }
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      // req (request) 에서 데이터 가져오기
      const title = req.body.title;
      const description = req.body.description;
  
      // 위 데이터를 award db에 추가하기
      const newAward = await awardService.addAward({
        user_id,
        title,
        description,
      });

      if (newAward.errorMessage) {
        throw new Error(newAward.errorMessage);
      }
  
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  });
  
awardRouter.get("/awards/:id", async function (req, res, next) {
    try {
      const awardId = req.params.id;
      const foundAward = await awardService.getAward({ awardId });
      if (foundAward.errorMessage) {
        throw new Error(foundAward.errorMessage);
      }

      res.status(200).send(foundAward);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.put("/awards/:id", async function (req, res, next) {
    try {
      const awardId = req.params.id;
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { title, description };

      const updatedAward = await awardService.setAward({ 
        awardId, 
        toUpdate 
      });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.get("/awardlist/:user_id", async function (req, res, next) {
    try {
      const { user_id } = req.params;
      const foundList = await awardService.getAwardList({ user_id });

      res.status(200).send(foundList);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.delete("/awards/:id", async function (req, res, next) {
    try {
      const awardId = req.params.id;
      const deletedResult = await awardService.deleteAward({ awardId });

      if (deletedResult.errorMessage) {
        throw new Error(deletedResult.errorMessage);
      }

      res.status(200).end();
    } catch (error) {
      next(error);
    }
});

export { awardRouter };
