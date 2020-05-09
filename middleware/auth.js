const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ msg: 'No token, Authorization denied.' });
    }

    try {
        const decodedPayload = jwt.verify(token, config.get('jwtSecret'));
        req.user = decodedPayload.user;
        next();
    } catch (error) {
        return res
            .status(401)
            .json({ msg: 'Cannot login at this time, try again later.' });
    }
};
