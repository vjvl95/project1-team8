import { AwardModel } from "../schemas/award";

class Award {
  static async create({ newAward }) {
    const createdNewAward = await AwardModel.create(newAward);
    return createdNewAward;
  }

  static async findByAwardId({ awardId }) {
    const award = await AwardModel.findOne({ id: awardId });
    return award;
  }

  static async findByUserId({ user_id }) {
    const awards = await AwardModel.find({ user_id });
    return awards;
  }

  static async update({ awardId, fieldToUpdate, newValue }) {
    const filter = { id: awardId };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedAward = await AwardModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedAward;
  }

  static async deleteByAwardId({ awardId }) {
    const result = await AwardModel.deleteOne({ id: awardId });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }

  static async findBySearchWord({ searchOpt }) {
    const awards = await AwardModel.find({ $or: searchOpt });
    return awards;
  }
}

export { Award };
