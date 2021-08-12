const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const {campgroundSchema} = require('../schemas')
const campgroundController = require('../controllers/campgrounds')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');


const multer = require('multer');
const {storage} = require('../cloudinary')
const upload = multer({storage});

router.route('/')
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn, upload.array('image'), validateCampground,  catchAsync(campgroundController.createCampground))


router.get('/new', isLoggedIn, campgroundController.newCampgroundForm)

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundController.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground))

router.get('/:id/edit', isLoggedIn,  isAuthor, catchAsync(campgroundController.editCampgroundForm))


module.exports = router;