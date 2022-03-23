import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create({ newCertificate }) {
    const createdNewCertificate = await CertificateModel.create(newCertificate);
    return createdNewCertificate;
  }

  static async findByCertificateId({ certificateId }) {
    const certificate = await CertificateModel.findOne({ id: certificateId });
    return certificate;
  }

  static async findByUserId({ user_id }) {
    const certificateList = await CertificateModel.find({ user_id });
    return certificateList;
  }

  static async update({ certificateId, fieldToUpdate, newValue }) {
    const filter = { id: certificateId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedCertificate = await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedCertificate;
  }

  static async deleteByCertificateId({ certificateId }) {
    const result = await CertificateModel.deleteOne({ id: certificateId });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }
  
  static async deleteByUserId({ user_id }) {
    const result = await CertificateModel.deleteMany({ user_id });
    return result;
  }

  static async findBySearchWord({ searchWord }) {
    const searchKey = ['title', 'description']
    const searchOpt = searchKey.map(v => {
      const arr = {}
      arr[v] = {$regex: searchWord, '$options': "i"}
      return arr
    })
    const certificateList = await CertificateModel.find({ $or: searchOpt });
    const userIdList = await certificateList.map(v => v.user_id)
    return userIdList;
  }
  
}

export { Certificate };
