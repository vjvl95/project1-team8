import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { commentController } from "../controllers/commentController";

const commentRouter = Router();
commentRouter.use(login_required);

commentRouter.post("/comments/comment", commentController.addComment);

commentRouter.get("/commentlist", commentController.getCommentList);

commentRouter.delete("/comments/:id", commentController.deleteComment);

export { commentRouter };
