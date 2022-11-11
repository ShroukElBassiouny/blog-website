const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')
const categories = require('../models/categories')
const route = new express.Router()

//create category
route.post('/category',auth ,async( req , res)=>{
    try{
        if(req.user.role === 'Admin'){
            const Category = new categories(req.body)
        const uniqueName = await categories.findOne({ name: req.body.name })
        if (uniqueName) {
            return res.send("This title already used"); 
        }
        await Category.save()
        res.status(201).send(Category)
        }else{
            res.status(403).send("You can't create one")
        }
    }catch(e){
        res.status(400).send(e)
    }  
    })

    module.exports= route