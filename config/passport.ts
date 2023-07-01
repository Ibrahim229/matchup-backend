//passport.js
import passport from 'passport';
import { config } from 'dotenv';

import { Strategy as LocalStrategy } from 'passport-local';
import User from '../db/user';

config();
passport.use("user-auth",new LocalStrategy({
    usernameField: "phoneNumber",
    passwordField: 'password'
},
    function (phoneNumber, password, cb) {
        return User.findOne({ phoneNumber })
            .then(user => {
                console.log("founded user", user)
                if (!user) {
                    return cb(null, false, { message: 'Incorrect phone number or password.' });
                }
                if (!user.isVerified) {
                    return cb(null, false, { message: 'User not verified' });
                }

                user.comparePassword(password, function (matchError, isMatch) {
                    if (matchError) {
                        return cb(null, false, { message: 'Incorrect phone number or password.' });
                    } else if (!isMatch) {
                        return cb(null, false, { message: 'Incorrect phone number or password.' });
                    } else {
                        return cb(null, user, { message: 'Logged In Successfully' });
                    }
                })

            })
            .catch(err => cb(err));
    }
));
passport.use("admin-auth",new LocalStrategy({
    usernameField: "userName",
    passwordField: 'password'
},
    function (userName, password, cb) {
        return User.findOne({ phoneNumber:userName })
            .then(user => {
                console.log("founded user", user)
                if (!user) {
                    return cb(null, false, { message: 'Incorrect userName or password.' });
                }
                if (!user.isVerified) {
                    return cb(null, false, { message: 'User not verified' });
                }

                user.comparePassword(password, function (matchError, isMatch) {
                    if (matchError) {
                        return cb(null, false, { message: 'Incorrect userName or password.' });
                    } else if (!isMatch) {
                        return cb(null, false, { message: 'Incorrect userName or password.' });
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
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
},
    function (jwtPayload, cb) {
        return User.findById(jwtPayload.id)
            .then(user => {
                if (user != null)
                    return cb(null, user)
                else{
                    return cb(new Error('User not found'), false);
                }
            })
            .catch(err => {
                console.log(err)
                return cb(err);
            });
    }
));