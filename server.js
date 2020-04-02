//required express library
const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
//initialize express application
const app = express();

// Connect DB
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//setting the route
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('/client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//create ENUM to store the port number
const PORT = process.env.PORT || 5000;
//listen to a specified port
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
