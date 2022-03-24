import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { findError } from "../utils/errorMessages"

class certificateService {
  static async addCertificate({ user_id, title, description, when_date }) {  
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newCertificate = { id, user_id, title, description, when_date };

    // db에 저장
    const createdNewCertificate = await Certificate.create({ newCertificate });
    createdNewCertificate.errorMessage = null;

    return createdNewCertificate;
  }

  static async getCertificate({ certificateId }) {
    const certificate = await Certificate.findByCertificateId({ certificateId });
    if (!certificate) {
      const errorMessage = findError("자격증")
      return { errorMessage };
    }

    return certificate;
  }

  static async getCertificateList({ user_id }) {
    const certificateList = await Certificate.findByUserId({ user_id });
    return certificateList;
  }

  static async setCertificate({ certificateId, toUpdate }) {
    let certificate = await Certificate.findByCertificateId({ certificateId });
    if (!certificate) {
      const errorMessage = findError("자격증")
      return { errorMessage };
    }

    if (toUpdate.title) {
      const fieldToUpdate = "title";
      const newValue = toUpdate.title;
      certificate = await Certificate.update({ 
        certificateId, 
        fieldToUpdate, 
        newValue 
      });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      certificate = await Certificate.update({ 
        certificateId, 
        fieldToUpdate, 
        newValue 
      });
    }

    if (toUpdate.when_date) {
      const fieldToUpdate = "when_date";
      const newValue = toUpdate.when_date;
      certificate = await Certificate.update({ 
        certificateId, 
        fieldToUpdate, 
        newValue 
      });
    }

    return certificate;
  }

  static async deleteCertificate({ certificateId }) {
    const deletedResult = await Certificate.deleteByCertificateId({ certificateId })
    if (!deletedResult) {
      const errorMessage = findError("자격증")
      return { errorMessage };
    }

    return deletedResult;
  }
}

export { certificateService };
