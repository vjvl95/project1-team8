import cors from "cors";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import { userAuthRouter } from "./routers/userRouter";
import { awardRouter } from "./routers/awardRouter";
import { certificateRouter } from "./routers/certificateRouter";
import { educationRouter } from "./routers/educationRouter";
import { projectRouter } from "./routers/projectRouter";
import { commentRouter } from "./routers/commentRouter";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import _ from "./utils/passport-setup"

const app = express();

// CORS 에러 방지
app.use(cors());

// express 기본 제공 middleware
// express.json(): POST 등의 요청과 함께 오는 json형태의 데이터를 인식하고 핸들링할 수 있게 함.
// express.urlencoded: 주로 Form submit 에 의해 만들어지는 URL-Encoded 형태의 데이터를 인식하고 핸들링할 수 있게 함.
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieSession({ 
  name: 'session',
  keys: ["key1", "key2"]
}))
app.use(passport.initialize());
app.use(passport.session());

// 기본 페이지
app.get("/", (req, res) => {
  res.send("안녕하세요, 레이서 프로젝트 API 입니다.");
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback", 
  passport.authenticate("google", { failureRedirect: "/failed" }),
  (req, res) => {
    console.log(req.user)
    res.status(200).json(req.user)
  });
app.get("/failed", (req, res) => {
  res.send("실패")
})
app.get("/logout", 
  (req, res) => {
    req.session = null;
    req.logout();
    res.redirect("/")
  });

// router, service 구현 (userAuthRouter는 맨 위에 있어야 함.)
app.use(userAuthRouter);
app.use(awardRouter)
app.use(certificateRouter)
app.use(educationRouter);
app.use(projectRouter);
app.use(commentRouter);

// 순서 중요 (router 에서 next() 시 아래의 에러 핸들링  middleware로 전달됨)
app.use(errorMiddleware);

export { app };
