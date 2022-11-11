const mongoose = require('mongoose')
const articleSchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref : 'Users'
    },
    square_cover: {
        type : String,
    },
    rectangle_cover:{
        type : String,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref : 'Categories'
    },
    paragraph:[{
        title:{
            type : String,
            required : true,
        },
        text:{
            type : String,
            required : true
        }
    }],
    readsCount:{
        type: Number
    },
    shareCount:{
        type: Number
    }
})
articleSchema.virtual('Users', {
    ref: 'Users',
    localField: '_id',
    foreignField: 'author'
})
articleSchema.virtual('categories', {
    ref: 'categories',
    localField: '_id',
    foreignField: 'category'
})

const Article = mongoose.model('articles', articleSchema)
module.exports = Article