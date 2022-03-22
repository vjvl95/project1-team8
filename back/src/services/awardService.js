import { Award } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class awardService {
  static async addAward({ user_id, title, description }) {  
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newAward = { id, user_id, title, description };

    // db에 저장
    const createdNewAward = await Award.create({ newAward });

    return createdNewAward;
  }

  static async getAward({ awardId }) {
    // awardId db에 존재 여부 확인
    const award = await Award.findByAwardId({ awardId });
    if (!award) {
      const errorMessage =
        "해당하는 수상내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return award;
  }

  static async getAwardList({ user_id }) {
    const awards = await Award.findByUserId({ user_id });
    return awards;
  }

  static async setAward({ awardId, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let award = await Award.findByAwardId({ awardId });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!award) {
      const errorMessage =
        "해당하는 수상내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      award = await Award.update({ awardId, fieldToUpdate, newValue });
    }

    return award;
  }

  static async deleteAward({ awardId }) {
    // awardId db에 존재 여부 확인

    const deletedResult = await Award.deleteByAwardId({ awardId })
    if (!deletedResult) {
      const errorMessage =
        "해당하는 수상내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return deletedResult;
  }
}
export { awardService };
