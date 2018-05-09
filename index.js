/* ===================
   Import Node Modules
=================== */
const express = require('express'); // Fast, unopinionated, minimalist web framework for node.
const app = express(); // Initiate Express Application
const router = express.Router(); // Creates a new router object.
const mongoose = require('mongoose'); // Node Tool for MongoDB
mongoose.Promise = global.Promise;
const databaseConfig = require('./app/config/database'); // Mongoose Config
const path = require('path'); // NodeJS Package for file paths
const authentication = require('./app/routes/authentication')(router); // Import Authentication Routes
const category = require('./app/routes/category')(router); // Import Category Routes
const event = require('./app/routes/event')(router); // Import Event Routes
const aplication = require('./app/routes/aplication')(router); // Import Aplication Routes
const fileUploader = require('./app/routes/fileUploader')(router); // Import File Uploader
var bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const cors = require('cors'); // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

// Database Connection
mongoose.connect(databaseConfig.uri, (err) => {
    if (err) {
        console.log('Could NOT connect to database: ', err);
    } else {
        console.log('Connected to database: ' + databaseConfig.db);
    }
});

// Middleware
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({limit: "50mb"})); // parse application/json
app.use(express.static(__dirname + '/client/src/')); // Provide static directory for frontend
app.use('/authentication', authentication); // Use Authentication routes in application
app.use('/category', category); // Use Authentication routes in application
app.use('/event', event); // Use Event routes in application
app.use('/aplication', aplication); // Use Aplication routes in application
app.use('/fileUploader', fileUploader); // Use FileUploader routes in application
// Connect server to Angular 2 Index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/src/index.html'));
});

// Start Server: Listen on port 8080
app.listen(8080, () => {
    console.log('Listening on port 8080');
});