import { Education } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";


class educationService {
  static async addEdu({ user_id, school, major, position }) {


    // id 는 유니크 값 부여
    const id = uuidv4();
    const newEducation = { id, school, major, position, user_id };

    // db에 저장
    const createdNewEducation = await Education.create({ newEducation });
    createdNewEducation.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewEducation;
  }

  static async getEdu({ id }) {
    // id가 education db에 존재 여부 확인
    const education = await Education.findById({ id });
    if (!education) {
      const errorMessage =
        "잘못된 접근입니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    const foundEducation = {
      ...education,
      errorMessage: null,
    };

    return foundEducation;
  }

  static async getEduList({ user_id }) {
    const educationlist = await Education.findByUserId({ user_id });

    return educationlist;
  }
}

export { educationService };
