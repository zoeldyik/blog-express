const express = require('express');
const router = express.Router();
const passport = require('passport');


function cekLogin(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/')
    } else {
        next();
    }
}


router.get('/', cekLogin, (req, res) => {
    const data = {
        page: 'login',
        admin: false,
        loginPage: true
    };
    res.render('login-view', data);
})

router.post('/',
    passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
    (req, res) => {
        req.flash('message', ['success', 'selamat datang admin'])
        res.redirect('/');
    });

module.exports = router;