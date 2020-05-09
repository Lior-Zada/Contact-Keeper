// This will connect to our Database - mongoDB
const mongoose = require('mongoose');
const config = require('config');
const url = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log('MongoDB Connected.');
    } catch (error) {
        console.log('Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
