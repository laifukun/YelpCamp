
const Campground = require('./models/campground')
const {campgroundSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const {reviewSchema} = require('./schemas')
const Review = require('./models/Review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must sign in!');
        return res.redirect('/login')
    }
    next();
}

module.exports.isAuthor = async (req, res, next)=>{
    const campground = await Campground.findById(req.params.id);
    if (!campground.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permisssion');
        return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next)=>{
    const review = await Review.findById(req.params.reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permisssion');
        return res.redirect(`/campgrounds/${req.params.id}`)
    }
    next();
}

module.exports.validateCampground =(req, res, next)=>{
    
    const {error} = campgroundSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.validateReview =(req, res, next)=>{    
    const {error} = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el=>el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}
