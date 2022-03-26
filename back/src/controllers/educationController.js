import is from "@sindresorhus/is";
import { educationService } from "../services/educationService";
import { headerError } from "../utils/errorMessages"

class educationController {
    static async addEducation (req, res, next) {
        try {
          if (is.emptyObject(req.body)) {
            throw new Error(
              headerError
            );
          }
          // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
          const user_id = req.currentUserId;
          // req (request) 에서 데이터 가져오기
          const school = req.body.school;
          const major = req.body.major;
          const position = req.body.position;
      
          // 위 데이터를 education db에 추가하기
          const newEducation = await educationService.addEducation({
            user_id,
            school,
            major,
            position,
          });
      
          if (newEducation.errorMessage) {
            throw new Error(newEducation.errorMessage);
          }
      
          res.status(201).end();
        } catch (error) {
          next(error);
        }
    }

    static async getEducation (req, res, next) {
        try {
          const educationId = req.params.id;
          const foundEdu = await educationService.getEducation({ educationId });
          if (foundEdu.errorMessage) {
            throw new Error(foundEdu.errorMessage);
          }
      
          res.status(200).json(foundEdu);
        } catch (error) {
          next(error);
        }
    }

    static async setEducation (req, res, next) {
        try {
          const educationId = req.params.id;
          const school = req.body.school ?? null;
          const major = req.body.major ?? null;
          const position = req.body.position ?? null;
      
          const toUpdate = { school, major, position };
      
          const updatedEdu = await educationService.setEducation({
            educationId,
            toUpdate,
          });
      
          if (updatedEdu.errorMessage) {
            throw new Error(updatedEdu.errorMessage);
          }
      
          res.status(200).json(updatedEdu);
        } catch (error) {
          next(error);
        }
    }

    static async getEducationList (req, res, next) {
        try {
          const { user_id } = req.params;
          const foundList = await educationService.getEducationList({ user_id });
      
          res.status(200).json(foundList);
        } catch (error) {
          next(error);
        }
    }

    static async deleteEducation (req, res, next) {
        try {
          const educationId = req.params.id;
          const deletedResult = await educationService.deleteEducation({ educationId });
      
          if (deletedResult.errorMessage) {
            throw new Error(deletedResult.errorMessage);
          }
      
          res.status(200).end();
        } catch (error) {
          next(error);
        }
    }
}

export { educationController };