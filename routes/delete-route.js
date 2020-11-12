const express = require('express');
const router = express.Router();
const { blogModel } = require('../model/allModel');

router.delete('/:id', async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params.id);
        console.log('satu blog telah di hapus');
        req.flash('message', ['primary', '1 post telah di hapus !']);
        res.json({ delete: 'sukses' });
    } catch (err) {
        throw new Error(err);
    }
})

module.exports = router;