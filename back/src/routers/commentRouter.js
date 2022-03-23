import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentService } from "../services/commentService";
import { headerError } from "../utils/errorMessages"

const commentRouter = Router();
commentRouter.use(login_required);

commentRouter.post(
  "/comments/comment", 
  async function (req, res, next) {
    try {
      if (is.emptyObject(req.body)) {
        throw new Error(
          headerError
        );
      }
      const user_id = req.currentUserId;
      // req (request) 에서 데이터 가져오기      
      const comment = req.body.comment;

      // 위 데이터를 유저 db에 추가하기
      const newComment = await commentService.addComment({
        user_id,
        comment,
      });

      res.status(201).end();
    } catch (error) {
      next(error);
    }
  }
);

commentRouter.get('/commentlist', async function (req, res, next) {
  try {
    const foundList = await commentService.getCommentList();

    if (foundList.errorMessage) {
      throw new Error(foundList.errorMessage);
    }

    res.status(200).send(foundList);
  } catch (error) {
    next(error);
  }
});

commentRouter.delete('/comments/:id', async function (req, res, next) {
  try {
    // URI로부터 commentId를 추출함.
    const commentId = req.params.id;
    const deletedResult = await commentService.deleteComment({
      commentId,
    });

    if (deletedResult.errorMessage) {
      throw new Error(deletedResult.errorMessage);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

export { commentRouter };
