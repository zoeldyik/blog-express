const express = require('express');
const router = express.Router();
const { blogModel } = require('../model/allModel');
const { query, validationResult } = require('express-validator');



router.get('/', [
    query('search').escape()
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.redirect('/');
        }

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
            page: 1,
            limit: 10
        };
        if (req.query.page) {
            option.page = req.query.page;
        }

        let getData;
        // buat data yang akan di kirim ke view
        const data = {
            page: 'home',
            kategori,
            admin: req.isAuthenticated()
        };

        if (req.query.search) {
            // tambahkan property query ke dalam objek data
            data.query = req.query.search;
            const regex = new RegExp(req.query.search, 'ig')
            getData = await blogModel.paginate({ title: regex }, option);
            // console.log(getData.docs.length < 1);

            // jika hasil pencarian sama dengan null
            // buat property baru ke objek data
            if (getData.docs.length < 1) {
                data.empty = 'blog tidak ditemukan'
            }
        } else {
            getData = await blogModel.paginate({}, option);
        }

        // tambahkan beberapa property baru yang di dapat dari process getData ke dalam  objek data
        // yang selanjutnya akan dikirim ke view
        const blogs = getData.docs;
        delete getData.docs;
        data.blogs = blogs;
        data.paginate = getData;
        // console.log(data);
        res.render('home-view', data);
    } catch (err) {
        throw new Error(err);
    }
})

module.exports = router;