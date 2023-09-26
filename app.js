const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425
const helmet = require('helmet')
const sequel = require('./dbConnect')
const users = require('./user')
const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: false }));
// register a user
app.post('/register', async(req,res)=>{
   try {
    const {first_name,last_name,email,password} = req.body
    const results  =await  users.create({first_name,last_name,email,password})
    if (results) {
        return res.send('User created successfully')
    } 
    res.send('Unable to create user')
   } catch (error) {
    console.log(error);
   }
})




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