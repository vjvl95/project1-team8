import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router();
awardRouter.use(login_required);

awardRouter.post("/award/create", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const user_id = req.body.user_id;
    const title = req.body.title;
    const description = req.body.description;

    // 위 데이터를 유저 db에 추가하기
    const newAward = await awardAuthService.addAward({
      user_id,
      title,
      description,
    });

    res.status(201).json(newAward);
  } catch (error) {
    next(error);
  }
});

awardRouter.get(
  "/awards/:id",
  async function (req, res, next) {
    try {
      // URI로부터 awardId를 추출함.
      const awardId = req.params.id;
      const award = await awardService.getAward({ awardId });

      if (award.errorMessage) {
        throw new Error(award.errorMessage);
      }

      res.status(200).send(award);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.put(
  "/awards/:id",
  async function (req, res, next) {
    try {
      // URI로부터 awardId를 추출함.
      const awardId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;

      const toUpdate = { title, description };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedAward = await awardService.setAward({ awardId, toUpdate });

      if (updatedAward.errorMessage) {
        throw new Error(updatedAward.errorMessage);
      }

      res.status(200).json(updatedAward);
    } catch (error) {
      next(error);
    }
  }
);

awardRouter.get(
  "/awardlist/:user_id",
  async function (req, res, next) {
    try {
      // URI로부터 user_id를 추출함.
      const user_Id = req.params.user_id;
      // 해당 user의 전체 수상내역 목록을 얻음
      const awards = await awardService.getAwardList({ user_id });
      res.status(200).send(awards);
    } catch (error) {
      next(error);
    }
  }
);

export { awardRouter };
