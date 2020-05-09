const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');
const authMiddleware = require('../middleware/auth');

//@route  GET api/auth
//@desc  Get logged-in user
//@access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Get the user object by the given id, don't return the password.
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(400).json({ msg: 'User not found.' });
        }

        return res.json(user);
    } catch (error) {
        console.log('error', error);

        return res.status(500).json({ msg: 'Server error.' });
    }
});

//@route  POST api/auth
//@desc  Auth user & get token
//@access  Public
router.post('/', getValidationConditions(), async (req, res) => {
    validateForm(req, res);
    const { email, password } = req.body;

    try {
        const user = await checkIfUserExists(res, email);

        await checkPassword(password, user, res);

        return createJWT(res, user);
    } catch (error) {
        return res.status(500).send('Server error');
    }
});

function getValidationConditions() {
    return [
        check('email', 'Insert email').isEmail(),
        check('password', 'Insert password').exists()
    ];
}

function validateForm(req, res) {
    // Perform the actual validation
    const errors = validationResult(req);

    // If errors in validation, return the errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errors.array()[0].msg });
    }
}

async function checkIfUserExists(res, email) {
    // Check if email already exists
    let user = await User.findOne({ email: email });

    // if exists, return error
    if (!user) {
        return res.status(400).json({
            msg: 'Wrong credentials.'
        });
    }
    return user;
}

async function checkPassword(password, user, res) {
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
        return res.status(400).json({ msg: 'Wrong credentials.' });
    }
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
