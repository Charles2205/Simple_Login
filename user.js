const {Sequelize,DataTypes} = require('sequelize')
const dbConnect = require('./dbConnect')
const User = dbConnect.define('Users',{
    id:{
        primaryKey:true,
        autoIncrement:true,
        type:DataTypes.INTEGER
    },
        first_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull: false
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false
        },
        password:{
            type:DataTypes.TEXT,
            allowNull: false
        }
})
User.sync({ alter: true })
module.exports=User