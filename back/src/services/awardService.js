import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { findError } from "../utils/errorMessages"

class awardService {
  static async addAward({ user_id, title, description }) {  
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });
    createdNewAward.errorMessage = null;

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    const award = await Award.findByAwardId({ awardId });
    if (!award) {
      const errorMessage = findError("수상");
      return { errorMessage };
    }
    return award;
  }

  static async getAwardList({ user_id }) {
    const awardList = await Award.findByUserId({ user_id });
    return awardList;
  }

  static async setAward({ awardId, toUpdate }) {
    let award = await Award.findByAwardId({ awardId });
    if (!award) {
      const errorMessage = findError("수상");
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ 
        awardId, 
        fieldToUpdate, 
        newValue 
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ 
        awardId, 
        fieldToUpdate, 
        newValue 
      });
    }

    return award;
  }

  static async deleteAward({ awardId }) {
    const deletedResult = await Award.deleteByAwardId({ awardId })
    if (!deletedResult) {
      const errorMessage = findError("수상");
      return { errorMessage };
    }

    return deletedResult;
  }

}
export { awardService };
