require('dotenv').config();
const conn = require('./config/db');
const morgan = require('morgan');
const express = require('express');
const session = require('cookie-session');
const flash = require('connect-flash');
const passport = require('passport');
const passportConfig = require('./config/passport-config');
const methodOverride = require('method-override');
const helmet = require('helmet');
const app = express();
const port = process.env.PORT || 4000;

app.set("env","production");
app.set("x-powered-by",false);
app.use(helmet.xssFilter());

// import routes
const homeRoute = require('./routes/home-route');
const loginRoute = require('./routes/login-route');
const logoutRoute = require('./routes/logout-route');
const createRoute = require('./routes/create-route');
const editRoute = require('./routes/edit-route');
const deleteRoute = require('./routes/delete-route');
const kategoriRoute = require('./routes/kategori-route');

app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.use(session({
    name: 'blog session',
    keys: [process.env.KEY1, process.env.KEY2]
}))
app.use(flash());

// init passport
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    res.locals.message = req.flash('message');
    next()
})

// set routes
app.use('/', homeRoute);
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);
app.use('/create', cekAuth, createRoute);
app.use('/kategori', kategoriRoute);
app.use('/edit', cekAuth, editRoute);
app.use('/delete', cekAuth, deleteRoute);

// error page
app.use((req, res, next) => {
    res.render('404');
})

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error')
})

app.listen(port, () => console.log('live at localhost:' + port));



// middleware ceklogin
function cekAuth(req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect('/')
    }
}

