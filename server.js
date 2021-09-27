const express= require('express')
const mongoose= require('mongoose')
require("dotenv/config")
const cors=require('cors')
const app=express();
mongoose.connect(
    process.env.MONGO_URL,
    ()=>{
        console.log('you are connected to database');
    }
);
app.use(cors())
app.use('/', require('./routes/useRoute.js'))
const PORT=5000;
app.listen(PORT,()=> console.log('listening on port' +PORT))