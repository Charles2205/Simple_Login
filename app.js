const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425
const helmet = require('helmet')
const sequel = require('./dbConnect')
const users = require('./user')
const bcrypt = require('bcrypt')
const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: false }));
// register a user
app.post('/register', async(req,res)=>{
   try {
    const {first_name,last_name,email,password} = req.body
    //hashing password 
    const hashPassword = await bcrypt.hash(password,10)
    const results  =await  users.create({first_name,last_name,email,"password":hashPassword})
    if (results) {
        return res.send(`User created successfully`)
    } 
    res.send('Unable to create user')
   } catch (error) {
    console.log(error);
   }
})

app.post('/login',async(req,res)=>{
    const {email,password} =req.body
    //   check if the username is vaild in the database
    const results = await users.findOne({where:{email}})
    if(!results){
        return  res.send('Invaild Credentials 😒')
    }
    const correctPassword = results.password
    // comparing hashed pass with current password
    const isCorrectPassword =await bcrypt.compare(password,correctPassword)
    if(!isCorrectPassword){
       return res.send('Invaild Credentials 😒')
    }
    res.send('Logged in Successfully  🎉 🎊')
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