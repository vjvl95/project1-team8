import { EducationModel } from "../schemas/education";

class Education {
  static async create({ newEducation }) {
    const createdNewEducation = await EducationModel.create(newEducation);
    createdNewEducation = await EducationModel.findOne({ id: newEducation.id }).populate('User')
    return createdNewEducation;
  }

  static async findByUserId({ user_id }) {
    const educationlist = await EducationModel.find({ user_id: user_id });
    return educationlist;
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
}

export { Education };
