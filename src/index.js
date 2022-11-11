const express = require('express')
require('./db/mongoose')
const app = express()
const userRoutes = require('./routers/user')
const categoryroute = require('./routers/category')
const articleRoutes = require('./routers/article')


const port = process.env.PORT
app.use(express.json())
app.use(userRoutes)
app.use(articleRoutes)
app.use(categoryroute)



app.listen(port,()=>{
    console.log('Sever is up on port', port)
})