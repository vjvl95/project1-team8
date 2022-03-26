import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userController } from "../controllers/userController";

const userRouter = Router();

userRouter.post("/users/user", userController.addUser);

userRouter.post("/user/login", userController.getUser);

userRouter.use(login_required);

userRouter.get("/userlist", userController.getUsers);

userRouter.get("/user/current", userController.getCurrentUser);

userRouter.put("/users/:id", userController.setUser);

userRouter.get("/users/:id", userController.getUserInfo);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userRouter.get("/afterlogin", userController.jwtCheck);

// :id는 user_id 임.
userRouter.delete("/users/:id", userController.deleteUser);

userRouter.put("/user/bookmark", userController.bookmark);

userRouter.get("/user/bookmarklist", userController.bookmarkList)

userRouter.get("/users/:id/bookmarkcount", userController.bookmarkCount)

userRouter.get("/user/bookmarktop3", userController.bookmarkTop3)

userRouter.get("/user/bookmarklist_data", userController.bookmarkListData)

userRouter.get("/userlist/search", userController.search);

export { userRouter };
