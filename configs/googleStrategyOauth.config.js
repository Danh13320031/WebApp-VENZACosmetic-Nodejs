import 'dotenv/config';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const googleStrategyOauthConfig = (app) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_REDIRECT_URL,
        passReqToCallback: true,
      },
      (req, accessToken, refreshToken, profile, done) => {
        const user = {
          google_id: profile.id,
          fullname: profile.displayName,
          email: profile.emails[0].value,
          phone: null,
          avatar: profile.photos[0].value,
          password: null,
          isVerified: true,
          loginType: 'google',
        };
        
        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));

  return passport;
};

export default googleStrategyOauthConfig;
