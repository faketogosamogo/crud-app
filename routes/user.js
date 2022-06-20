const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require("../models/user")

router.get('/register', (req, res) => {
    res.render('user_register', { });
});

router.post('/register', (req, res, next) => {
    User.register(new User({ username : req.body.username }), req.body.password, (err, user) => {
        if (err) {
          return res.render('user_register', { error : err.message });
        }

        passport.authenticate('local')(req, res, () => {
            req.session.save((err) => {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

router.get('/login', (req, res) => {
    res.render('user_login', { user : req.user, error : req.flash('error')});
});

router.post('/login', passport.authenticate('local', { failureRedirect: 'login', failureFlash: true }), (req, res, next) => {
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.save((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;