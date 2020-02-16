module.exports = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error_msg', 'You need to be logged in!')
        return res.redirect('/login')
    }
    next();
}



