//required express library
const express = require('express');
//initialize express application
const app = express();

//setting the route
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));

//create ENUM to store the port number
const PORT = process.env.PORT || 5000;
//listen to a specified port
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
