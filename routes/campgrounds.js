const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const {campgroundSchema} = require('../schemas')
const campgroundController = require('../controllers/campgrounds')
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');


router.route('/')
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn, validateCampground, catchAsync(campgroundController.createCampground))

router.get('/new', isLoggedIn, campgroundController.newCampgroundForm)

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isAuthor, validateCampground, catchAsync(campgroundController.editCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.editCampgroundForm))


module.exports = router;