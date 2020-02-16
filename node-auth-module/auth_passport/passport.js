const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const User = require('../models/User');

module.exports = function (passport) {
    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registerd' })
                    }
                    bcrypt.compare(password, user.password)
                        .then(doMatch => {
                            if (doMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, { message: 'The password is incorrect!' })
                            }
                        })
                })
        })
    )
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
}


