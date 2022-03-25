import { Router } from "express";
import passport from "passport";
import bodyParser from "body-parser";
import cookieSession from "cookie-session";
import _ from "../utils/passport-setup"

const googleAuthRouter = Router();

googleAuthRouter.use(bodyParser.json());
googleAuthRouter.use(bodyParser.urlencoded({ extended: false }));
googleAuthRouter.use(cookieSession({
    name: 'session',
    keys: ["key1", "key2"]
}))
googleAuthRouter.use(passport.initialize());
googleAuthRouter.use(passport.session());


googleAuthRouter.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

googleAuthRouter.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/failed" }),
    (req, res) => {
        res.status(200).json(req.user)
    });

googleAuthRouter.get("/failed", (req, res) => {
    res.send("실패")
})

googleAuthRouter.get("/logout",
    (req, res) => {
        req.session = null;
        req.logout();
        res.redirect("/")
    });

export { googleAuthRouter };
