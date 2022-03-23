import { User, Award, Certificate, Education, Project } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import { existError, matchError, findError } from "../utils/errorMessages"
import { searchFunc } from "../utils/serviceFuction"

class userAuthService {
  static async addUser({ name, email, password }) {
    // 이메일 중복 확인
    const user = await User.findByEmail({ email });
    if (user) {
      const errorMessage = existError("이메일")
      return { errorMessage };
    }

    // 비밀번호 해쉬화
    const hashedPassword = await bcrypt.hash(password, 10);

    // id 는 유니크 값 부여
    const id = uuidv4();
    const newUser = { id, name, email, password: hashedPassword };

    // db에 저장
    const createdNewUser = await User.create({ newUser });
    createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

    return createdNewUser;
  }

  static async getUser({ email, password }) {
    // 이메일 db에 존재 여부 확인
    const user = await User.findByEmail({ email });
    if (!user) {
      const errorMessage = findError("이메일")
      return { errorMessage };
    }

    // 비밀번호 일치 여부 확인
    const correctPasswordHash = user.password;
    const isPasswordCorrect = await bcrypt.compare(
      password,
      correctPasswordHash
    );
    if (!isPasswordCorrect) {
      const errorMessage = matchError("비밀번호")
      return { errorMessage };
    }

    // 로그인 성공 -> JWT 웹 토큰 생성
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const token = jwt.sign({ user_id: user.id }, secretKey);

    // 반환할 loginuser 객체를 위한 변수 설정
    const id = user.id;
    const name = user.name;
    const description = user.description;

    const loginUser = {
      token,
      id,
      email,
      name,
      description,
      errorMessage: null,
    };

    return loginUser;
  }

  static async getUsers() {
    const users = await User.findAll();
    return users;
  }

  static async setUser({ user_id, toUpdate }) {
    // 우선 해당 id 의 유저가 db에 존재하는지 여부 확인
    let user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = findError("가입")
      return { errorMessage };
    }

    // 업데이트 대상에 name이 있다면, 즉 name 값이 null 이 아니라면 업데이트 진행
    if (toUpdate.name) {
      const fieldToUpdate = "name";
      const newValue = toUpdate.name;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.email) {
      const fieldToUpdate = "email";
      const newValue = toUpdate.email;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.password) {
      const fieldToUpdate = "password";
      const newValue = toUpdate.password;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }

    if (toUpdate.description) {
      const fieldToUpdate = "description";
      const newValue = toUpdate.description;
      user = await User.update({ user_id, fieldToUpdate, newValue });
    }
    
    if (toUpdate.bookMarkList) {

      const targetId = toUpdate.bookMarkList

      const fieldToUpdate = "bookMarkList";
      const targetField = "bookMarked";

      const target = await User.findById({ user_id: targetId })
      console.log(target)
      if (toUpdate.bookMarked) {
        if (user.bookMarkList.includes(targetId)){
          const errorMessage = "이미 즐겨찾기 등록한 유저입니다.";
          return {errorMessage}
        } else {
          const newValue = [...user.bookMarkList, toUpdate.bookMarkList];
          const targetNewValue = target.bookMarked + 1;
          const result = await Promise.all([
          User.update({ user_id, fieldToUpdate, newValue }),
          User.update({ user_id: targetId, fieldToUpdate: targetField, newValue: targetNewValue})
        ])
        return result
        }
      } else if (!toUpdate.bookMarked) {
        if (!user.bookMarkList.includes(targetId)){
          const errorMessage = "즐겨찾기 목록에 없는 유저입니다."
          return {errorMessage}
        } else {
          const newValue = user.bookMarkList.filter(user_id => user_id!==targetId);
          const targetNewValue = target.bookMarked - 1;
          const result = await Promise.all([
            User.update({ user_id, fieldToUpdate, newValue }),
            User.update({ user_id: targetId, fieldToUpdate: targetField, newValue: targetNewValue})
          ]);
          return result
          }
      }
    }

    return user;
  }

  static async getUserInfo({ user_id }) {
    const user = await User.findById({ user_id });

    // db에서 찾지 못한 경우, 에러 메시지 반환
    if (!user) {
      const errorMessage = findError("이메일")
      return { errorMessage };
    }

    return user;
  }

  static async deleteUser({ user_id }) {
    // awardId db에 존재 여부 확인

    const deletedResult = await Promise.all([
      User.deleteByUserId({ user_id }),
      Award.deleteByUserId({ user_id }),
      Certificate.deleteByUserId({ user_id }),
      Education.deleteByUserId({ user_id }),
      Project.deleteByUserId({ user_id })
    ]);

    return deletedResult;
  }

  static async getTop3() {
    const fieldToSort = ["bookMarked"]
    const sortType = [-1]
    let users = await User.sort({ fieldToSort, sortType });
    users = users.filter(user=>user.bookMarked>0);
    users = users.splice(0,3)

    if (users===[]) {
      const errorMessage =
        "아직 아무도 북마크되지 않았습니다.";
      return { errorMessage };
    }

    return users;
  }

  static async getBookmarkUsers({ user_id }) {
    const user = await User.findById({ user_id });

    if (!user) {
      const errorMessage = findError("이메일")
      return { errorMessage };
    }

    const list = user.bookMarkList
    const resultList = []
    await Promise.all(list.map(async (user_id)=>{
      const info = await User.findById({ user_id })
      resultList.push(info)
    }))
    return resultList
  }

  static async searchUserList({ searchType, searchWord }) {
    let userAll = []
    if (searchType === "all") {
      let searchOpt = searchFunc(searchType, searchWord)
      const userList1 = await Award.findBySearchWord({ searchOpt })
      const userList2 = await Certificate.findBySearchWord({ searchOpt })
      const userList3 = await Project.findBySearchWord({ searchOpt })
      searchOpt = searchFunc("education", searchWord)
      const userList4 = await Education.findBySearchWord({ searchOpt })
      // user 합치기
      userAll = [...userList1, ...userList2, ...userList3, ...userList4]
    }
    else if (searchType === "award") {
      const searchOpt = searchFunc(searchType, searchWord)
      userAll = await Award.findBySearchWord({ searchOpt })
    } else if (searchType === "certificate") {
      const searchOpt = searchFunc(searchType, searchWord)
      userAll = await Certificate.findBySearchWord({ searchOpt })
    } else if (searchType === "education") {
      const searchOpt = searchFunc(searchType, searchWord)
      userAll = await Education.findBySearchWord({ searchOpt })
    } else if (searchType === "project") {
      const searchOpt = searchFunc(searchType, searchWord)
      userAll = await Project.findBySearchWord({ searchOpt })
    }

    const set = new Set(userAll);
    const userArr = [...set]
    // [ {id: user_id}, {id: user_id} ... ] 만들기
    const userIdList = await userArr.map(v => {
      return {id: v}
    })
    const userList = await User.findByIdList({ userIdList })

    return userList;    
  }
}

export { userAuthService };
