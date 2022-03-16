import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByAwardId({ award_id }) {
    const award = await AwardModel.findOne({ id: award_id });
    return award;
  }

  static async findByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

  static async update({ award_id, fieldToUpdate, newValue }) {
    const filter = { id: award_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }
}

export { Award };
