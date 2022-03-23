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
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  static async getEducation({ educationId }) {
    // id가 education db에 존재 여부 확인
    const education = await Education.findByEducationId({ educationId });
    if (!education) {
      const errorMessage = '잘못된 접근입니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }
    education.errorMessage = null;
    return education;
  }

  static async getEducationList({ user_id }) {
    const educationList = await Education.findByUserId({ user_id });
    return educationList;
  }

  static async setEducation({ educationId, toUpdate }) {

    // id가 education db에 존재 여부 확인
    let education = await Education.findByEducationId({ educationId });
    if (!education) {
      const errorMessage = findError("학력")
      return { errorMessage };
    }
    education.errorMessage = null;

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
    // awardId db에 존재 여부 확인

    const deletedResult = await Education.deleteByEducationId({ educationId });
    if (!deletedResult) {
      const errorMessage =
        '해당하는 내용이 없습니다. 다시 한 번 확인해 주세요.';
      return { errorMessage };
    }

    return deletedResult;
  }

}
export { educationService };
