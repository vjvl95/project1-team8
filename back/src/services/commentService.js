import { Comment } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";
import { findError } from "../utils/errorMessages"

class commentService {
  static async addComment({ user_id, comment }) {  
    // id 는 유니크 값 부여
    const id = uuidv4();
    const newComment = { id, user_id, comment };

    // db에 저장
    const createdNewComment = await Comment.create({ newComment });

    return createdNewComment;
  }

  static async getCommentList() {
    // commentId가 comment db에 존재 여부 확인
    const commentList = await Comment.findCommentList();
    if (!commentList) {
      const errorMessage = findError("댓글")
      return { errorMessage };
    }

    return commentList;
  }

  static async deleteComment({ commentId }) {
    const deletedResult = await Comment.deleteByCommentId({ commentId })
    if (!deletedResult) {
      const errorMessage = findError("댓글")
      return { errorMessage };
    }

    return deletedResult;
  }
}

export { commentService };
