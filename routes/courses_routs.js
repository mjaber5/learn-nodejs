
const express = require('express');

const router = express.Router();

const { validationSchema } = require('../middlewares/validation_schema');

const courseController = require ('../controllers/courses_controller');

router.route('/')
        .get(courseController.getCourses)
        .post(   
            validationSchema(),courseController.addCourse)

router.route('/:courseId')
        .get(courseController.getSingleCourse)
        .patch(courseController.updateCourses)
        .delete(courseController.deleteCourse );

module.exports = router ; 