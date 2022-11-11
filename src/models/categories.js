const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true,
    },
    articles:{
        article : {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Articles'
        }
    },
    videos: String,
    papers:String
})


const Category = mongoose.model('categories', categorySchema)
module.exports = Category