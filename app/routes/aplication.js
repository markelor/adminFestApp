const User = require('../models/user'); // Import User Model Schema
const Aplication = require('../models/aplication'); // Import Aplication Model Schema
const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
const es = require('../translate/es'); // Import translate es
const eu = require('../translate/eu'); // Import translate eu
const en = require('../translate/en'); // Import translate en
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email'); // Mongoose Email
module.exports = (router) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: emailConfig.host,
        port: emailConfig.port,
        secure: emailConfig.secure,
        auth: {
            user: emailConfig.email,
            pass: emailConfig.password
        }
    });

    /* ===============================================================
       CREATE NEW aplication
    =============================================================== */
    router.post('/newAplication', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if aplication users was provided
            if (!req.body.users || req.body.users.length <= 0) {
                res.json({ success: false, message: eval(language + '.newAplication.usersProvidedError') }); // Return error
            } else {
                // Check if aplication title was provided
                if (!req.body.title) {
                    res.json({ success: false, message: eval(language + '.newAplication.titleProvidedError') }); // Return error
                } else {
                    // Check if aplication licenseName was provided
                    if (!req.body.licenseName) {
                        res.json({ success: false, message: eval(language + '.newAplication.licenseNameProvidedError') }); // Return error message
                    } else {
                        // Check if aplication price was provided
                        if (!req.body.price) {
                            res.json({ success: false, message: eval(language + '.newAplication.priceProvidedError') }); // Return error message
                        } else {
                            // Check if aplication expiredAt was provided
                            if (!req.body.expiredAt) {
                                res.json({ success: false, message: eval(language + '.newAplication.expiredAtProvidedError') }); // Return error message
                            } else {
                                User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                                    if (err) {
                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                        var mailOptions = {
                                            from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                            to: [emailConfig.email],
                                            subject: ' Find one 1 newAplication error ',
                                            text: 'The following error has been reported in Kultura: ' + err,
                                            html: 'The following error has been reported in Kultura:<br><br>' + err
                                        };
                                        // Function to send e-mail to myself
                                        transporter.sendMail(mailOptions, function(err, info) {
                                            if (err) {
                                                console.log(err); // If error with sending e-mail, log to console/terminal
                                            } else {
                                                console.log(info); // Log success message to console if sent
                                                console.log(user.email); // Display e-mail that it was sent to
                                            }
                                        });
                                        res.json({ success: false, message: eval(language + '.general.generalError') });
                                    } else {
                                        // Check if logged in user is found in database
                                        if (!mainUser) {
                                            res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                        } else {
                                            // Check if is admin or moderator
                                            if (mainUser.permission !== 'admin' && mainUser.permission !== 'moderator') {
                                                res.json({ success: false, message: eval(language + '.editUser.permissionError') }); // Return error
                                            } else {
                                                const aplication = new Aplication({
                                                    users: req.body.users,
                                                    title: req.body.title,
                                                    events: req.body.events,
                                                    entityName: req.body.entityName,
                                                    license: {
                                                        name: req.body.name,
                                                        price: req.body.price,
                                                        expiredAt: req.body.expiredAt
                                                    },
                                                    createdAt: Date.now(),
                                                    updatedAt: Date.now()
                                                });
                                                // Save aplication into database
                                                aplication.save((err) => {
                                                    // Check if error
                                                    if (err) {
                                                        console.log(err);
                                                        // Check if error is a validation error
                                                        if (err.errors) {
                                                            // Check if validation error is in the aplication field
                                                            if (err.errors['title']) {
                                                                res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                            } else {
                                                                if (err.errors['entityName']) {
                                                                    res.json({ success: false, message: eval(language + err.errors['entityName'].message) }); // Return error message
                                                                } else {
                                                                    res.json({ success: false, message: err }); // Return general error message
                                                                }
                                                            }
                                                        } else {
                                                            res.json({ success: false, message: eval(language + '.newAplication.saveError'), err }); // Return general error message
                                                        }
                                                    } else {
                                                        res.json({ success: true, message: eval(language + '.newAplication.success') }); // Return success message
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }
    });
    return router;
};