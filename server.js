const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const userModel = require('./models/User')

//Database connection
mongoose.connect(process.env.CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log("Database is Connected"))
    .catch((err) => console.log(err.message))

// Middleware
app.use(express.json());
//POST :  ADD A NEW USER TO THE DATABASE
app.post('/addUser', (req,res) =>{
    const { name, age, profession } = req.body /*Distruction*/ 
    let newUser = new userModel({name,age,profession})
    //console.log(newUser)
    newUser.save()
    .then(user => res.send(user))
    .catch(err => console.log(err.message))
})

//GET :  RETURN ALL USERS 
app.get('/allUsers' , (req,res) =>{
    userModel.find()
    .then(users => res.json(users))
    .catch(err => console.log(err.message))

})
// PUT : EDIT A USER BY ID  
app.put('/updateUser/:_id' ,(req,res) =>{
    const {_id} = req.params
    //const {name,age,profession} = req.body
    userModel.findOneAndUpdate({_id} , {$set : {...req.body}})
    .then (() => res.send ('User Updated'))
    .catch(err => console.log(err.message))
})

// DELETE : REMOVE A USER BY ID 
app.delete('/deleteUser/:_id' , (req,res) =>{
    const {_id} = req.params
    userModel.findOneAndDelete({_id})
    .then (() => res.json ({msg: 'User Deleted'}))
    .catch(err => console.log(err.message))

})
//Server connection
const port = process.env.PORT || 5000
app.listen(port, err => err ? console.log(err) : console.log(`server is running on port ${port}`))