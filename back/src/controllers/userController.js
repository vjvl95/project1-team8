import is from "@sindresorhus/is";
import { userService } from "../services/userService";
import { headerError } from "../utils/errorMessages"

class userController {
    static async addUser (req, res, next) {
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
    }

    static async getUser (req, res, next) {
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
    }

    static async getUsers (req, res, next) {
        try {
          // 전체 사용자 목록을 얻음
          const users = await userService.getUsers();
          res.status(200).send(users);
        } catch (error) {
          next(error);
        }
    }

    static async getCurrentUser (req, res, next) {
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

    static async setUser (req, res, next) {
        try {
            // URI로부터 사용자 id를 추출함.
            const user_id = req.params.id;
            // body data 로부터 업데이트할 사용자 정보를 추출함.
            const name = req.body.name ?? null;
            // const email = req.body.email ?? null;
            const password = req.body.password ?? null;
            const description = req.body.description ?? null;
            const bookMarkList = null;
            const bookMarked = null;
            
            // const toUpdate = { name, email, password, description, bookMarkList, bookMarked };
            const toUpdate = { name, password, description, bookMarkList, bookMarked };
    
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

    static async getUserInfo (req, res, next) {
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

    static jwtCheck (req, res, next) {
        res
          .status(200)
          .send(
            `안녕하세요 ${req.currentUserId}님, jwt 웹 토큰 기능 정상 작동 중입니다.`
          );
    }

    static async deleteUser (req, res, next) {
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
    }

    static async bookmark (req, res, next) {
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
    }
    
    static async bookmarkList (req, res, next) {
        try {
          const user_id = req.currentUserId
      
          const User = await userService.getUserInfo({ user_id });
          const bookMarkList = User.bookMarkList;
          res.status(200).json(bookMarkList);
        } catch (error) {
          next(error);
        }
    }

    static async bookmarkCount (req, res, next) {
        try {
          const user_id = req.params.id
      
          const User = await userService.getUserInfo({ user_id });
          const bookMarkCount = User.bookMarked;
          res.status(200).json(bookMarkCount);
        } catch (error) {
          next(error);
        }
    }

    static async bookmarkTop3 (req, res, next) {
        try {
          const result = await userService.getTop3();
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
    }

    static async bookmarkListData (req, res, next) {
        try {
          const user_id = req.currentUserId;
          const result = await userService.getBookmarkUsers({ user_id });
          res.status(200).json(result);
        } catch (error) {
          next(error);
        }
    }

    static async search (req, res, next) {
        try {
          const { searchType, searchWord } = req.query;
          const foundList = await userService.searchUserList({ searchType, searchWord });
      
          res.status(200).send(foundList);
        } catch (error) {
          next(error);
        }
    }
}

export { userController };