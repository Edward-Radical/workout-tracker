import dotenv from 'dotenv';
import passport from 'passport';
import logger from '../utils/logger';
import User from '../models/Users.model';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ExtractJwt, Strategy as JwtStrategy  } from 'passport-jwt';

dotenv.config();

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if a User with the same GoogleId already exists
          let user = await User.findOne({
              where: { 
                  social_login: { social: 'google', socialId: profile.id }  
              },
          });

          // If there's no user a new User is created with google profile data
          if (!user && profile && profile.emails) {
              const obj = {
                  email: profile.emails[0].value,
                  username: profile.displayName,
                  password: 'social-login-password', // dummy password because it's a Sequelize required field
                  social_login: { social: 'google', socialId: profile.id }
              }
              user = await User.create(obj);
          }

          // Complete the authentication
          return done(null, profile);
            
        } catch (error) {
            return done(error, undefined);
        }
    }
  )
);


// TO_DO mi sa che non mi serve avendo cambiato libreria dei cookie
// const secretOrKey = process.env.JWT_SECRET as string;
// // Define the JWT strategy
// passport.use(
//   new JwtStrategy(
//     {
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  // Get JWT from Authorization header
//       secretOrKey: secretOrKey,  // Secret to verify JWT
//     },
//     async (jwt_payload: any, done: Function) => {

//       logger.info("JwtStrategy - INIT");
//       logger.info(jwt_payload);
//       try {
//         // Here, `jwt_payload` is the decoded JWT token
//         const user = await User.findOne(jwt_payload.userId); // Find user in DB
//         logger.info(user);
//         if (!user) {
//           return done(null, false);  // No user found
//         }
//         return done(null, user);  // Successfully authenticated user
//       } catch (err) {
//         return done(err, false);  // Handle error if any
//       }
//     }
//   )
// );

// Save the session to the cookie
passport.serializeUser((user: any, done: Function) => {
    // Store only the user ID in the session, or another unique identifier
    done(null, user.id);
});

// Read the session from the cookie
passport.deserializeUser((id: any, done: Function) => {
   done(null, id)
});