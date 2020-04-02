const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// get the User model.
const User = require('../models/User');

//@route  POST api/users
//@desc  Register a user
//@access  Public
router.post(
    '/',
    // Set conditions to validate parameters
    getValidationConditions(),
    async (req, res) => {
        validateForm(req, res);
        // Deconstruct the parameters
        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({
                    msg: 'User already exists, choose a different email.'
                });
            }
            user = createNewUser(name, email, password);

            encryptUserPassword(user, password);

            // Save the new user to the Database
            await user.save();

            return createJWT(res, user);
        } catch (error) {
            console.log('error', error);

            return res.status(500).send('Server error');
        }
    }
);
function getValidationConditions() {
    return [
        check('name', 'Name is required.')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email.').isEmail(),
        check('password', 'Password must contain 5-8 characters.').isLength({
            min: 5,
            max: 8
        })
    ];
}

function validateForm(req, res) {
    // Perform the actual validation
    const errors = validationResult(req);

    // If errors in validation, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
}

function createNewUser(name, email, password) {
    // Create a new user using the "User" model.
    return new User({
        name,
        email,
        password
    });
}

function encryptUserPassword(user, password) {
    // Encrypt the user's password using bcrypt lib
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(password, salt);
}

function createJWT(res, user) {
    const payload = {
        user: {
            id: user.id
        }
    };

    jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
            expiresIn: 36000
        },
        (err, token) => {
            if (err) throw err;
            return res.json({ token });
        }
    );
}

module.exports = router;
