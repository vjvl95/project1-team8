import { UserModel } from "../schemas/user";

class User {
  static async create({ newUser }) {
    const createdNewUser = await UserModel.create(newUser);
    return createdNewUser;
  }

  static async findByEmail({ email }) {
    const user = await UserModel.findOne({ email });
    return user;
  }

  static async findById({ user_id }) {
    const user = await UserModel.findOne({ id: user_id });
    return user;
  }

  static async findByIdList({ userIdList }) {
    const userList = await UserModel.find({ $or: userIdList });
    return userList;
  }

  static async findAll() {
    const users = await UserModel.find({});
    return users;
  }

  static async update({ user_id, fieldToUpdate, newValue }) {
    const filter = { id: user_id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    );
    return updatedUser;
  }

  static async deleteByUserId({ user_id }) {
    const result = await UserModel.deleteOne({ id: user_id });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }
  
  static async sort({ fieldToSort, sortType }) {
    const sortBy = {}
    for (let i = 0; i < fieldToSort.length; i++) {
      sortBy[fieldToSort[i]]=sortType[i]
    }
    const sortedUsers = await UserModel.find({}).sort(sortBy);
    return sortedUsers;
  }

}

export { User };
