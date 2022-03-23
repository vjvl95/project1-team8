import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { userAuthService } from "../services/userService";
import { headerError } from "../utils/errorMessages"

const userAuthRouter = Router();

userAuthRouter.post("/users/user", async function (req, res, next) {
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
    const newUser = await userAuthService.addUser({
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

userAuthRouter.post('/user/login', async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const user = await userAuthService.getUser({ email, password });

    if (user.errorMessage) {
      throw new Error(user.errorMessage);
    }

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
});

userAuthRouter.get(
  '/userlist',
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const users = await userAuthService.getUsers();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  '/user/current',
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const user_id = req.currentUserId;
      const currentUserInfo = await userAuthService.getUserInfo({
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

userAuthRouter.put(
  '/users/:id',
  login_required,
  async function (req, res, next) {
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
      const updatedUser = await userAuthService.setUser({ user_id, toUpdate });

      if (updatedUser.errorMessage) {
        throw new Error(updatedUser.errorMessage);
      }

      res.status(200).json(updatedUser);
    } catch (error) {
      next(error);
    }
  }
);

userAuthRouter.get(
  '/users/:id',
  login_required,
  async function (req, res, next) {
    try {
      const user_id = req.params.id;
      const currentUserInfo = await userAuthService.getUserInfo({ user_id });

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
userAuthRouter.get('/afterlogin', login_required, function (req, res, next) {
  res
    .status(200)
    .send(
      `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
    );
});

// :id는 user_id 임.
userAuthRouter.delete('/users/:id', async function (req, res, next) {
  try {
    const user_id = req.params.id;
    const deletedResult = await userAuthService.deleteUser({ user_id });

    if (deletedResult.errorMessage) {
      throw new Error(deletedResult.errorMessage);
    }

    res.status(200).end();
  } catch (error) {
    next(error);
  }
});

userAuthRouter.put("/user/bookmark", login_required, async function (req, res, next) {
  try {
    const me = req.currentUserId
    const { target, toggle } = req.body
    
    const name = null;
    const email = null;
    const password = null;
    const description = null;
    const bookMarkList = target;
    const bookMarked = toggle;

    const result = await userAuthService.setUser({
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

userAuthRouter.get("/user/bookmarklist", login_required, async function (req, res, next) {
  try {
    const user_id = req.currentUserId

    const User = await userAuthService.getUserInfo({ user_id });
    const bookMarkList = User.bookMarkList;
    res.status(200).json(bookMarkList);
  } catch (error) {
    next(error);
  }
})

userAuthRouter.get("/users/:id/bookmarkcount", login_required, async function (req, res, next) {
  try {
    const user_id = req.params.id

    const User = await userAuthService.getUserInfo({ user_id });
    const bookMarkCount = User.bookMarked;
    res.status(200).json(bookMarkCount);
  } catch (error) {
    next(error);
  }
})

userAuthRouter.get("/user/bookmarktop3", login_required, async function (req, res, next) {
  try {
    const result = await userAuthService.getTop3();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
})

export { userAuthRouter };
