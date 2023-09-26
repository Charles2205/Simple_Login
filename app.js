const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425
const helmet = require('helmet')
const sequel = require('./dbConnect')
const users = require('./user')
const app = express()

app.use(helmet())




const startServer=async()=>{
    try {
        await sequel.authenticate()
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()