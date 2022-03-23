import { CommentModel } from "../schemas/comment";

class Comment {
  static async create({ newComment }) {
    const createdNewComment = await CommentModel.create(newComment);
    return createdNewComment;
  }

  static async findCommentList() {
    const commentList = await CommentModel.find({});
    return commentList;
  }

  static async deleteByCommentId({ commentId }) {
    const result = await CommentModel.deleteOne({ id: commentId });
    const deletedResult = (result.deletedCount == 1) //Boolean
    return deletedResult;
  }
  
  static async deleteByUserId({ user_id }) {
    const result = await CommentModel.deleteMany({ user_id });
    return result;
  }

}

export { Comment };
