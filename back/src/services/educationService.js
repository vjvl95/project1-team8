import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { findError } from "../utils/errorMessages"

class educationService {
  static async addEducation({ user_id, school, major, position }) {
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, school, major, position, user_id };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; 

    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
    const education = await Education.findByEducationId({ educationId });
    if (!education) {
      const errorMessage = findError("학력")
      return { errorMessage };
    }
    return education;
  }

  static async getEducationList({ user_id }) {
    const educationList = await Education.findByUserId({ user_id });
    return educationList;
  }

  static async setEducation({ educationId, toUpdate }) {
    let education = await Education.findByEducationId({ educationId });
    if (!education) {
      const errorMessage = findError("학력")
      return { errorMessage };
    }

    if (toUpdate.school) {
      const fieldToUpdate = 'school';
      const newValue = toUpdate.school;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.major) {
      const fieldToUpdate = 'major';
      const newValue = toUpdate.major;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    if (toUpdate.position) {
      const fieldToUpdate = 'position';
      const newValue = toUpdate.position;
      education = await Education.update({
        educationId,
        fieldToUpdate,
        newValue,
      });
    }

    return education;
  }

  static async deleteEducation({ educationId }) {
    const deletedResult = await Education.deleteByEducationId({ educationId });
    if (!deletedResult) {
      const errorMessage = findError("학력")
      return { errorMessage };
    }

    return deletedResult;
  }

}
export { educationService };
