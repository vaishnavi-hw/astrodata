const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const port = 3000;

const app = express();
app.use(express.urlencoded())
app.use(express.static(__dirname))
mongoose.connect('mongodb+srv://sumanzzz2024:vaishnavi@cluster0.1guwsmu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
const db =mongoose.connection
db.once('open',()=>{
    console.log("Success mongodb")
})
const dataSchema = new mongoose.Schema ({
    lagna:String,
    bhav:String,
    grah:String,
    text:String
})
const users = mongoose.model("data",dataSchema)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})
app.post('/post',async(req,res)=>{
    const {lagna,bhav,grah,text} = req.body;
    const user = new users({
        lagna,
        bhav,
        grah,
        text
    })
    await user.save()
    console.log(user)
})
app.listen(port,()=>{
    console.log("server started")
})