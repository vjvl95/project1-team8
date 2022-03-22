import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const educationList = await EducationModel.find({ user_id: user_id });
    return educationList;
  }

  static async findById({ id }) {
    const education = await EducationModel.findOne({ id: id });
    return education;
  }


  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedEducation = await EducationModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedEducation;
  }

  static async findBySearchWord({ searchOpt }) {
    const educationList = await EducationModel.find({ $or: searchOpt });
    return educationList;
  }
}

export { Education };
