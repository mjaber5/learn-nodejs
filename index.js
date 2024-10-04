const express = require ('express');

const httpStatusText = require('./utils/httpStatusText'); 

const cors = require('cors');
const app = express();


require('dotenv').config();

const mongoose = require('mongoose');

const url = process.env.MONGO_URL;

mongoose.connect(url).then(()=>{
    console.log('mongodb server start');
});

app.use(cors());
app.use(express.json()); 

const coursesRouter = require('./routes/courses_routs');
const usersRouter = require('./routes/user_routs');

app.use('/api/courses',coursesRouter);
app.use('/api/users',usersRouter)

// global middleware for not found router
app.all('*',(req,res,next)=>{
    return res.status(404).json({status: httpStatusText.ERROR,message:'this resource is not available'});    
})

// global error handler 
app.use((error, req , res , next ) => {
    res.status(error.statusCode || 500).json({status: error.statusText||httpStatusText.ERROR,msg:error.message});
})




app.listen( process.env.PORT || 5000,()=>{
    console.log('listening on port 5000');
});