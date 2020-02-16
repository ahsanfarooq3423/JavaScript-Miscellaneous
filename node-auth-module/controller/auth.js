const User = require('../models/User'); 
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    res.render('login')
}

exports.getSignup = (req, res, next) => {
    res.render('register')
}


exports.postSignup = (req, res, next) => {
    const {name, email, password, password2} = req.body;
    const errors = []

    if (!name || !email || !password || !password2) {
        errors.push({msg : 'Please fill all the fields'})
    }

    if (password !== password2){
        errors.push({msg : 'Password do not matches!'})
    }
    
    if (password.length < 4){
        errors.push({msg : 'Password should be greater than 3 characters'} )
    }

    if (errors.length > 0) {
        res.render('register', {
            errors : errors,
            name : name,
            email : email,
            password : password,
            password2 : password2
        })
    } else {
        User.findOne({email : email})
            .then(user => {
                if (user) {
                    errors.push({msg : 'The Email is already registered!!!'})
                    res.render('register', {
                        errors : errors,
                        name : name,
                        email : email,
                        password : password,
                        password2 : password2
                    })
                } else {
                    bcrypt.hash(password,12)
                        .then(hashedPassword => {
                            const user = new User({
                                name: name,
                                email : email,
                                password : hashedPassword
                            })
                            return user.save()
                        })
                        .then(response => {
                            console.log('The user has been saved!')
                            res.send('Got it in the database')
                        })
                        .catch(err => console.log(err ))
                }
            })
    }

}