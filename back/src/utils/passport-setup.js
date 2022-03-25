import passport from 'passport'
import google from 'passport-google-oauth20';
import { userService } from '../services/userService';
const GoogleStrategy = google.Strategy

passport.serializeUser((user, done)=>{
    done(null, user)})
passport.deserializeUser((user, done)=>{
    done(null, user)})

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:${process.env.SERVER_PORT}/auth/google/callback`
  },
  async function(accessToken, refreshToken, profile, done) {
    console.log(profile)
    await userService.findOrCreate({ profile })
    const user = await userService.getUser({ email: profile._json.email, password: profile.id })
    done(null, user)
  }
));