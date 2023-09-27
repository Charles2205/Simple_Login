const express = require('express')
require ('dotenv').config()
const PORT = process.env.PORT || 3425
const APP_SECRET = process.env.APP_SECRET
const helmet = require('helmet')
const sequel = require('./dbConnect')
const users = require('./user')
const bcrypt = require('bcrypt')
const expressSession = require('express-session')
const app = express()

app.use(helmet())
app.use(express.urlencoded({ extended: false }));


// session
app.use(expressSession({
    secret:APP_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{}
}))

// midddlewares
const isUserSignIn =(req,res,next)=>{
    try {
        if(req.session.user){
            return next()
            
        }
        res.send('Login First')
    } catch (error) {
        console.log(error);
    }

}

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


// Sign in 
app.post('/login',async(req,res)=>{
    try {
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
    req.session.user =results.id
    
    res.send(`Logged in Successfully  🎉 🎊`)
    console.log(req.session.user)
    
    } catch (error) {
        console.log(error);
    }
})

// homepage
app.get('/', isUserSignIn,(req,res)=>{
   try {
    res.send('Hello Charles')
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