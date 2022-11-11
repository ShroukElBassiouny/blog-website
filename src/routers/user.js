const express = require('express')
require('../db/mongoose')
const users = require('../models/user')
const auth = require('../middleware/auth')
const route = new express.Router()

//Create user
route.post('/users',async( req , res)=>{
    const user = new users(req.body)
    try{
        const uniqueEmail = await users.findOne({ email: req.body.email })
        if (uniqueEmail) {
            return res.send("This email already used"); 
            }
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({user,token})
    }catch(e){
        console.log(e)
        res.status(400).send(e)
    }
})
//login 
route.post('/users/login',async(req,res)=>{
    try{
        const user = await users.findByCredentials(req.body.email , req.body.password)
        const token = await user.generateAuthToken()
        res.send({user , token })
    }catch(e){
        console.log(e)
        res.status(400).send()
    }
})
//logout
route.post('/users/logout', auth , async(req,res)=>{
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()

    }
})


module.exports= route
