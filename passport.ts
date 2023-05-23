//passport.js
import passport from 'passport';
import { config } from 'dotenv';

import { Strategy as LocalStrategy } from 'passport-local';
import User from './db/user';

config();
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    function (email, password, cb) {
        console.log("email and pass", email, password)
        //this one is typically a DB call. Assume that the returned user object is pre-formatted and ready for storing in JWT
        return User.findOne({ email })
            .then(user => {
                if (!user) {
                    return cb(null, false, { message: 'Incorrect email or password.' });
                }
                user.comparePassword(password, function (matchError, isMatch) {
                    console.log("chick password", matchError, isMatch)
                    if (matchError) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    } else if (!isMatch) {
                        return cb(null, false, { message: 'Incorrect email or password.' });
                    } else {
                        return cb(null, user, { message: 'Logged In Successfully' });
                    }
                })

            })
            .catch(err => cb(err));
    }
));

import * as passportJWT from 'passport-jwt'

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
console.log("jwt_key", process.env.JWT_SECRET)
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    function (jwtPayload, cb) {

        //find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
        return User.findById(jwtPayload.id)
            .then(user => {
                if (user != null)
                    return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));