const User = require('../models/user'); // Import User Model Schema
const Place = require('../models/place'); // Import Place Model Schema
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
       CREATE NEW place
    =============================================================== */
    router.post('/newPlace', (req, res) => {
        var language = req.body.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if place eventId was provided
            if (!req.body.eventId) {
                res.json({ success: false, message: eval(language + '.newPlace.eventIdProvidedError') }); // Return error
            } else {
                // Check if place province was provided
                if (!req.body.province) {
                    res.json({ success: false, message: eval(language + '.newPlace.provinceProvidedError') }); // Return error message
                } else { // Check if place municipality was provided
                    if (!req.body.municipality) {
                        res.json({ success: false, message: eval(language + '.newPlace.municipalityProvidedError') }); // Return error message
                    } else { // Check if place lat was provided
                        if (!req.body.lat) {
                            res.json({ success: false, message: eval(language + '.newPlace.latProvidedError') }); // Return error message
                        } else { // Check if place lng was provided
                            if (!req.body.lng) {
                                res.json({ success: false, message: eval(language + '.newPlace.lngProvidedError') }); // Return error message
                            } else {
                                if (!req.body.sponsorId) {
                                    req.body.sponsorId = null;
                                }
                                const place = new Place({
                                    sponsorId: req.body.sponsorId,
                                    eventId: req.body.eventId,
                                    language: language,
                                    province: req.body.province,
                                    municipality: req.body.municipality,
                                    lat:req.body.lat,
                                    lng:req.body.lng,
                                    createdAt: Date.now(),
                                    updatedAt: Date.now()
                                });

                                // Save place into database
                                place.save((err) => {
                                    // Check if error
                                    if (err) {
                                        // Check if error is a validation error
                                        if (err.errors) {
                                            // Check if validation error is in the place field
                                            if (err.errors['lat']) {
                                                res.json({ success: false, message: eval(language + err.errors['lat'].message) }); // Return error message
                                            } else {
                                                if (err.errors['lng']) {
                                                    res.json({ success: false, message: eval(language + err.errors['lng'].message) }); // Return error message
                                                } else {
                                                    res.json({ success: false, message: err }); // Return general error message
                                                }

                                            }
                                        } else {
                                            res.json({ success: false, message: eval(language + '.newPlace.saveError'), err }); // Return general error message
                                        }
                                    } else {
                                        res.json({ success: true, message: eval(language + '.newPlace.success') }); // Return success message
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