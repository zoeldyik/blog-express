const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { blogModel } = require('../model/allModel');

router.get('/:id', async (req, res) => {
    try {
        const blog = await blogModel.findById(req.params.id);
        if (!blog) {
            res.redirect('/page not found');
        }

        const data = {
            admin: req.isAuthenticated(),
            page: 'edit post',
            blog
        };

        res.render('edit-view', data);
    } catch (err) {
        throw new Error(err);
    }
})


router.patch('/:id', [
    body('title').trim().notEmpty(),
    body('kategori').trim().notEmpty(),
    body('teks').trim().notEmpty(),
], async (req, res) => {
    try {
        const { id, title, kategori, teks } = req.body;
        const slug = kategori.replace(/\s+/g, '-');
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('back');
        }

        // jika option tidak di tentukan makan updatePost akan menghasilkan query dari data sebelum di update
        const option = { new: true };
        const updatePost = await blogModel.findByIdAndUpdate(id, { title, kategori: slug, teks }, option);
        console.log(updatePost);
        console.log('update post berhasil');
        req.flash('message', ['primary', '1 post telah di update']);
        res.redirect('/');
    } catch (err) {
        throw new Error(err);
    }
})

module.exports = router;