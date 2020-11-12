const express = require('express');
const router = express.Router();
const { blogModel } = require('../model/allModel');

router.get('/:kategori', async (req, res) => {
    try {
        // get kategori
        const getkategori = await (await blogModel.find());
        let kategori = getkategori.map(e => e.kategori);
        // get unique kategori
        const temp = [];
        kategori.map((e) => {
            if (!temp.includes(e)) { temp.push(e); }
        })
        kategori = temp;
        // ------------------------------------------------------------------


        const option = {
            sort: { _id: 'DESC' },
            page: req.query.page || 1,
            limit: 7
        };
        const getData = await blogModel.paginate({ kategori: req.params.kategori }, option);

        const blogs = getData.docs;
        // jika tidak ada kategori, redirect ke home
        if (blogs.length < 1) return res.redirect('/');
        delete getData.docs;

        const data = {
            page: 'kategori post',
            kategori,
            blogs,
            paginate: getData,
            admin: req.isAuthenticated()
        }
        console.log(data);
        res.render('home-view', data);
    } catch (err) {
        throw new Error(err);
    }
})

module.exports = router;
