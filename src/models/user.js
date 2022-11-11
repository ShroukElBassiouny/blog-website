const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    email :{
        type : String,
        required : true,
        trim : true,
        unique : true, 
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        required : true,
        minlength: 7,
        trim: true,
    },
    name:{
        type : String,
        required : true,
        trim : true
    },
    role:{
        type : String,
        enum:['Admin','Vistor','Author'],
        default: 'Author'
    },
    thumbnail:{
        type: String,
        trim : true
    },
    facebook: {
        type: String,
        trim : true
    },
    twitter: {
        type:String,
        trim : true
    },
    articles:[{
        article : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Articles'
    }}],
    tokens:[{
        token : {
            type : String,
            required : true
        }
    }]
})

userSchema.methods.toJSON = function(){
    const userObject = this.toObject()
    delete userObject.password
    delete userObject.tokens
    delete userObject.__v
    return userObject
}
userSchema.methods.generateAuthToken = async function(){
    const token =jwt.sign({email: this.email},process.env.JWT_SECRET)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}
//Check email and password before logging
userSchema.statics.findByCredentials = async(email , password)=>{
    const user = await User.findOne({email})
    if (!user){
        throw new Error('User not found!')
    }
    if(password !== user.password){
        throw new Error('Invalid Password')
    }
    return user
}

const User = mongoose.model('Users', userSchema)
module.exports = User