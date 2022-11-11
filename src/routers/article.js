const express = require('express')
require('../db/mongoose')
const auth = require('../middleware/auth')
const Articles = require('../models/article')
const route = new express.Router()
//create article
route.post('/article/:id',auth ,async( req , res)=>{
    try{ 
        if(req.user.role === 'Author'){
        const article = new Articles({
                ...req.body,
                author: req.user._id,
                category: req.params.id
            })
                const uniqueName = await Articles.findOne({ name: req.body.name })
        if (uniqueName) {
            return res.send("This title already used"); 
            }
        await article.save()
        res.status(201).send(article)
    }else{
        res.status(403).send("You can't create one")
    }
    }catch(e){
        res.status(400).send(e)
    }  
    })

// get all articles
route.get('/articles',async(req,res)=>{
    try {
        const articles = await Articles.find({})
        res.send(articles)
    } catch (e) {
        res.status(500).send()
    }
})

// get article by id
// get article by Author && category >> category >> author
route.get('/articles/:id',auth,async(req,res)=>{
    try {
        if(!req.query.category && !req.query.author){
            const article = await Articles.findById({_id : req.params.id })
            return res.send(article)
        }else{
            const articles = await Articles.find({category : req.query.category , author : req.query.author})
        /*.populate({path: 'categories', match:{_id:req.query.category}})
        .populate({path: 'Users' , match:{_id:req.query.author}})*/
        res.send(articles)
        }
        
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


    module.exports= route