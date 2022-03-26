import { Router } from "express";
import { login_required } from "../middlewares/login_required";

const userRouter = Router();

userRouter.post("/users/user", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        headerError
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 유저 db에 추가하기
    const newUser = await userService.addUser({
      name,
      email,
      password,
    });

    if (newUser.errorMessage) {
      throw new Error(newUser.errorMessage);
    }

    res.status(201).end();
  } catch (error) {
    next(error);
  }
});

userRouter.post("/user/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userRouter.use(login_required);

userRouter.get(
  "/userlist", async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/user/current", async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userService.getUserInfo({
        user_id,
      });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  "/users/:id", async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const user_id = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const name = req.body.name ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;
      const description = req.body.description ?? null;
      const bookMarkList = null;
      const bookMarked = null;

      const toUpdate = { name, email, password, description, bookMarkList, bookMarked };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedUser = await userService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/users/:id", async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userService.getUserInfo({ user_id });

      if (currentUserInfo.errorMessage) {
        throw new Error(currentUserInfo.errorMessage);
      }

      res.status(200).send(currentUserInfo);
    } catch (error) {
      next(error);
    }
  }
);

// jwt 토큰 기능 확인용, 삭제해도 되는 라우터임.
userRouter.get("/afterlogin", function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

// :id는 user_id 임.
userRouter.delete("/users/:id", async function (req, res, next) {
  try {
    const user_id = req.params.id;
    const deletedResult = await userService.deleteUser({ user_id });

    if (deletedResult.errorMessage) {
      throw new Error(deletedResult.errorMessage);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

userRouter.put("/user/bookmark", async function (req, res, next) {
  try {
    const me = req.currentUserId
    const { target, toggle } = req.body
    
    const name = null;
    const email = null;
    const password = null;
    const description = null;
    const bookMarkList = target;
    const bookMarked = toggle;

    const result = await userService.setUser({
      user_id: me,
      toUpdate: { name, email, password, description, bookMarkList, bookMarked }
    })

    if (result.errorMessage) {
      throw new Error(result.errorMessage);
    }

    res.status(200).end();
    
  } catch (error) {
    next(error);
  }
});

userRouter.get("/user/bookmarklist", async function (req, res, next) {
  try {
    const user_id = req.currentUserId

    const User = await userService.getUserInfo({ user_id });
    const bookMarkList = User.bookMarkList;
    res.status(200).json(bookMarkList);
  } catch (error) {
    next(error);
  }
})

userRouter.get("/users/:id/bookmarkcount", async function (req, res, next) {
  try {
    const user_id = req.params.id

    const User = await userService.getUserInfo({ user_id });
    const bookMarkCount = User.bookMarked;
    res.status(200).json(bookMarkCount);
  } catch (error) {
    next(error);
  }
})

userRouter.get("/user/bookmarktop3", async function (req, res, next) {
  try {
    const result = await userService.getTop3();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})


userRouter.get("/user/bookmarklist_data", async function (req, res, next) {
  try {
    const user_id = req.currentUserId;
    const result = await userService.getBookmarkUsers({ user_id });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

userRouter.get("/userlist/notop3", async function (req, res, next) {
    try {
      const users = await userService.getNoTop3();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get("/userlist/search", async function (req, res, next) {
  try {
    const { searchType, searchWord } = req.query;
    const foundList = await userService.searchUserList({ searchType, searchWord });

    res.status(200).send(foundList);
  } catch (error) {
    next(error);
  }
});

export { userRouter };
