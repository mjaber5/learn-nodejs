const {validationResult} = require('express-validator');

const Course = require('../models/course-model');

const httpStatusText = require('../utils/httpStatusText'); 
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utils/appError');


const getCourses = asyncWrapper(
    async (req,res)=>{
   
        const query = req.query;
        console.log('query',query);
    
        const limit = query.limit ||10;
        const page = query.page || 1;
        const skip = (page - 1)*limit;
        
        const courses = await Course.find({},{'__v':false}).limit(limit).skip(skip);
        
        res.json({status: httpStatusText.SUCCESS,data:{courses}});    
    }
)

const addCourse = asyncWrapper(
    async (req,res,next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            const error = appError.create(errors.array(),400,httpStatusText.FAIL)
            return next(error)
        }
        const newCourse =  new Course(req.body);
        await newCourse.save();
        res.status(201).json({status: httpStatusText.SUCCESS,data:{course : newCourse}});
    }
)


const getSingleCourse =  asyncWrapper(
    async (req,res,next)=>{ 
            const course = await Course.findById(req.params.courseId);
            if (!course){
              const error = appError.create(
                    'course not found',
                    404,
                    httpStatusText.FAIL
                );
                return next(error);
            }
            return res.json({status: httpStatusText.SUCCESS,data:{course}});
    }
)

const updateCourses = asyncWrapper(
    async(req,res)=>{
        const courseID = req.params.courseId;
            const updatedCourse = await Course.updateOne({_id: courseID}, {$set: {...req.body}});
            return res.status(200).json({status: httpStatusText.SUCCESS,data:{course : updatedCourse}}); 
    }
)

const deleteCourse = asyncWrapper(
    async(req,res)=>{
        await Course.deleteOne({id: req.params.courseID});
    
        res.status(200).json({status: httpStatusText.SUCCESS, data: null})
    }
)
 
module.exports = {
    getCourses,
    getSingleCourse,
    addCourse,
    updateCourses,
    deleteCourse
}