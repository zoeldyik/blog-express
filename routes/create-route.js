const express = require('express');
const { body, validationResult } = require('express-validator');
const { blogModel } = require('../model/allModel');
const router = express.Router();

router.get('/', (req, res) => {
    const data = {
        admin: req.isAuthenticated(),
        page: 'new post'
    };
    res.render('create-view', data);
})

router.post('/', [
    body('title').trim().notEmpty(),
    body('kategori').trim().notEmpty(),
    body('teks').trim().notEmpty(),
],
    async (req, res) => {
        try {
            const { title, kategori, teks } = req.body;
            const slug = kategori.replace(/\s+/g, '-');
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.redirect('/create');
            }

            // masukan data ke db
            const newPost = new blogModel({ title, kategori: slug, teks });
            await newPost.save();
            console.log('post baru berhasil di buat');
            req.flash('message', ['primary', '1 post baru berhasil di tambahkan'])
            res.redirect('/');
        } catch (err) {
            throw new Error(err);
        }
    })

module.exports = router;