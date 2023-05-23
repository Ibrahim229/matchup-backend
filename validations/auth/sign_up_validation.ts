const { body } = require('express-validator');
var signUpValidate = [
    body('phoneNumber').isMobilePhone("ar-EG").withMessage('Phone number not valid').trim().escape(),
    body('email').isEmail().withMessage('Email not has valid format').trim().escape().normalizeEmail(),
    body('password').isLength({ min: 8 })
        .withMessage('Password Must Be at Least 8 Characters')
        .matches('[0-9]').withMessage('Password Must Contain a Number')
        .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter').trim().escape()
]

export default signUpValidate;       