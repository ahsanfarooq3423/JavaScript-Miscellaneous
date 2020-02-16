exports.getIndex = (req, res, next) => {
    res.render('welcome')
}

exports.getDashboard = (req, res, next) => {
    res.render('dashboard');
}

