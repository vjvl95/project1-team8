import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post(
  "/certificate/create", 
  async function (req, res, next) {
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
      const when_date = req.body.when_date;

      // 위 데이터를 유저 db에 추가하기
      const newCertificate = await certificateService.addCertificate({
        user_id,
        title,
        description,
        when_date
      });

      res.status(201).json(newCertificate);
    } catch (error) {
      next(error);
    }
});

certificateRouter.get(
  "/certificates/:id",
  async function (req, res, next) {
    try {
      // URI로부터 certificateId를 추출함.
      const certificateId = req.params.id;
      const certificate = await certificateService.getCertificate({ certificateId });

      if (certificate.errorMessage) {
        throw new Error(certificate.errorMessage);
      }

      res.status(200).send(certificate);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.put(
  "/certificates/:id",
  async function (req, res, next) {
    try {
      // URI로부터 certificateId를 추출함.
      const certificateId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const title = req.body.title ?? null;
      const description = req.body.description ?? null;
      const when_date = req.body.when_date ?? null;

      const toUpdate = { title, description, when_date };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCertificate = await certificateService.setCertificate({ certificateId, toUpdate });

      if (updatedCertificate.errorMessage) {
        throw new Error(updatedCertificate.errorMessage);
      }

      res.status(200).json(updatedCertificate);
    } catch (error) {
      next(error);
    }
  }
);



export { certificateRouter };
