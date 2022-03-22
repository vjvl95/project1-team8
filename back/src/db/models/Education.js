import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const educationlist = await EducationModel.find({ user_id: user_id });
    return educationlist;
  }

  static async findByEducationId({ educationId }) {
    const education = await EducationModel.findOne({ id: educationId });
    return education;
  }


  static async update({ educationId, fieldToUpdate, newValue }) {
    const filter = { id: educationId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async deleteByEducationId({ educationId }) {
    const result = await EducationModel.deleteOne({ id: educationId });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }

  static async deleteByUserId({ user_id }) {
    const result = await EducationModel.deleteMany({ user_id });
    return result;
  }
}

export { Education };
