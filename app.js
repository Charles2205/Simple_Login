const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425


const app = express()


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