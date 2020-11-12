const mongoose = require('mongoose');
const paginate = require('mongoose-paginate-v2');
const schema = mongoose.Schema;

const user = new schema({
    username: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
});

const blog = new schema({
    title: {
        required: true,
        type: String
    },
    kategori: {
        required: true,
        type: String
    },
    teks: {
        required: true,
        type: String
    }
});


blog.plugin(paginate);

const userModel = mongoose.model('userModel', user, 'user');
const blogModel = mongoose.model('blogModel', blog, 'blogs');


module.exports = { userModel, blogModel };