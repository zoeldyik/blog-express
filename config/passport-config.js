const passport = require('passport');
const LocalStrategy = require('passport-local');
const { userModel } = require('../model/allModel');
const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
        userModel.findOne({ username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, req.flash('message', ['danger', 'username salah!']));

            if (user) {
                const cekPassword = bcrypt.compareSync(password, user.password);
                cekPassword ? done(null, user) : done(null, false, req.flash('message', ['danger', 'password salah!']));
            }
        })
    }
));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    userModel.findById(id, (err, user) => {
        done(err, user);
    });
});