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



export { certificateRouter };
