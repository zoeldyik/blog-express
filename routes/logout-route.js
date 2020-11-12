const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    req.logout();
    console.log('user telah logout');
    req.flash('message', ['primary', 'kamu telah logout!'])
    res.redirect('/');
})

module.exports = router;