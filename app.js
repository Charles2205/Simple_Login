const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425
const helmet = require('helmet')

const app = express()

app.use(helmet())




const startServer=()=>{
    try {
        app.listen(PORT,()=>{
            console.log(`server is running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

startServer()