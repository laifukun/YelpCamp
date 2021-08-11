const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync')
const ExpressError = require('../utils/ExpressError')
const Campground = require('../models/campground')
const Review = require('../models/Review')
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware')
const reviewController = require('../controllers/reviews')


router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewController.deleteReview))

module.exports = router;