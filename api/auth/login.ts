import jwt from 'jsonwebtoken'
import passport from "passport"

/* POST login. */
const login = function (req, res, next) {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: info,
                user: user
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXPIRES_IN });
            var userData = user.toJson()
            return res.json({ userData, token });
        })
    })(req, res, next);;
}

export default login;