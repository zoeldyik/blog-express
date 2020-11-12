const mongoose = require('mongoose');
module.exports = mongoose.connect(process.env.DBURL,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },
    (err) => {
        if (err) throw new Error(err);
        console.log('db connected');
    })