import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";
import { headerError } from "../utils/errorMessages"

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post(
  "/certificates/certificate", 
  async function (req, res, next) {
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
      const when_date = req.body.when_date;

      // 위 데이터를 certificate db에 추가하기
      const newCertificate = await certificateService.addCertificate({
        user_id,
        title,
        description,
        when_date,
      });

      if (newCertificate.errorMessage) {
        throw new Error(newCertificate.errorMessage);
      }

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.get('/certificates/:id', async function (req, res, next) {
  try {
    const certificateId = req.params.id;
    const foundCertificate = await certificateService.getCertificate({ certificateId });

    if (foundCertificate.errorMessage) {
      throw new Error(foundCertificate.errorMessage);
    }

    res.status(200).send(foundCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.put("/certificates/:id", async function (req, res, next) {
  try {
    const certificateId = req.params.id;
    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    const toUpdate = { title, description, when_date };

    const updatedCertificate = await certificateService.setCertificate({
      certificateId,
      toUpdate,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificatelist/:user_id", async function (req, res, next) {
    try {
      const user_id = req.params.user_id;
      const foundList = await certificateService.getCertificateList({ user_id });

      res.status(200).send(foundList);
    } catch (error) {
      next(error);
    }
  }
);

certificateRouter.delete('/certificates/:id', async function (req, res, next) {
  try {
    const certificateId = req.params.id;
    const deletedResult = await certificateService.deleteCertificate({ certificateId });

    if (deletedResult.errorMessage) {
      throw new Error(deletedResult.errorMessage);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export { certificateRouter };
