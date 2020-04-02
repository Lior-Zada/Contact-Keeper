const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Contact = require('../models/Contact');
const authMiddleware = require('../middleware/auth');

//@route  GET api/contacts
//@desc  Get all users contacts
//@access  Private
router.get('/', authMiddleware, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        });
        return res.json({ contacts });
    } catch (error) {
        return res.status(500).send('Server Error');
    }
});
//@route  POST api/contacts
//@desc Add new contact
//@access  Private
router.post(
    '/',
    [authMiddleware, getValidationConditions()],
    async (req, res) => {
        validateForm(req, res);

        const { name, email, mobile, type } = req.body;

        try {
            const newContact = new Contact({
                name,
                email,
                mobile,
                type,
                user: req.user.id
            });

            const result = await newContact.save();

            return res.json(result);
        } catch (error) {
            return res.status(500).send('Server error.');
        }
    }
);
//@route  PUT api/contacts/
//@desc Update contact
//@access  Private
router.put('/', authMiddleware, async (req, res) => {
    try {
        await Contact.findByIdAndUpdate(req.body._id, req.body);
        return res.json({ msg: 'success' });
    } catch (error) {
        return res.status(500).send('server error.');
    }
});

//@route  DELETE api/contacts/:id
//@desc Delete contact
//@access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        await Contact.findByIdAndRemove(req.params.id);
        return res.json({ msg: 'success' });
    } catch (error) {
        return res.status(500).send('Server error.');
    }
});

function getValidationConditions() {
    return [
        check('name', 'Name is required.')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email.').isEmail(),
        check('mobile', 'Please include a valid mobile number')
            .not()
            .isEmpty()
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

module.exports = router;
