const User = require('../models/user'); // Import User Model Schema
const Event = require('../models/event'); // Import Event Model Schema
const Category = require('../models/category'); // Import Category Model Schema
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
       CREATE NEW category
    =============================================================== */
    router.post('/newEvent', (req, res) => {
        var language = req.body.event.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if event createdBy was provided
            if (!req.body.event.createdBy) {
                res.json({ success: false, message: eval(language + '.newEvent.createdByProvidedError') }); // Return error
            } else {
                // Check if event category was provided
                if (!req.body.event.categoryId) {
                    res.json({ success: false, message: eval(language + '.newEvent.categoryIdProvidedError') }); // Return error
                } else {
                    // Check if event title was provided
                    if (!req.body.event.title) {
                        res.json({ success: false, message: eval(language + '.newEvent.titleProvidedError') }); // Return error message
                    } else {
                        // Check if event start was provided
                        if (!req.body.event.start) {
                            res.json({ success: false, message: eval(language + '.newEvent.startProvidedError') }); // Return error message
                        } else {
                            // Check if event end was provided
                            if (!req.body.event.end) {
                                res.json({ success: false, message: eval(language + '.newEvent.endProvidedError') }); // Return error message
                            } else {
                                // Check if event description was provided
                                if (!req.body.event.description) {
                                    res.json({ success: false, message: eval(language + '.newEvent.descriptionProvidedError') }); // Return error message
                                } else {
                                    // Check if place province was provided
                                    if (!req.body.place.province) {
                                        res.json({ success: false, message: eval(language + '.newPlace.provinceProvidedError') }); // Return error message
                                    } else {
                                        // Check if place geonameIdProvince was provided
                                        if (!req.body.place.geonameIdProvince) {
                                            res.json({ success: false, message: eval(language + '.newPlace.geonameIdProvinceProvidedError') }); // Return error message
                                        } else {
                                            // Check if place municipality was provided
                                            if (!req.body.place.municipality) {
                                                res.json({ success: false, message: eval(language + '.newPlace.municipalityProvidedError') }); // Return error message
                                            } else {
                                                // Check if place geonameIdmunicipality was provided
                                                if (!req.body.place.geonameIdMunicipality) {
                                                    res.json({ success: false, message: eval(language + '.newPlace.geonameIdMunicipalityProvidedError') }); // Return error message
                                                } else {
                                                    // Check if place lat was provided
                                                    if (!req.body.place.lat) {
                                                        res.json({ success: false, message: eval(language + '.newPlace.latProvidedError') }); // Return error message
                                                    } else {
                                                        // Check if place lng was provided
                                                        if (!req.body.place.lng) {
                                                            res.json({ success: false, message: eval(language + '.newPlace.lngProvidedError') }); // Return error message
                                                        } else {
                                                            function eventSave(place) {
                                                                const event = new Event({
                                                                    createdBy: req.body.event.createdBy,
                                                                    categoryId: req.body.event.categoryId,
                                                                    placeId: place._id,
                                                                    language: language,
                                                                    title: req.body.event.title,
                                                                    participants: req.body.event.participants,
                                                                    start: req.body.event.start,
                                                                    end: req.body.event.end,
                                                                    description: req.body.event.description,
                                                                    observations: req.body.event.observations,
                                                                    images: {
                                                                        poster: req.body.event.imagesPoster,
                                                                        description: req.body.event.imagesDescription
                                                                    },
                                                                    createdAt: Date.now(),
                                                                    updatedAt: Date.now()
                                                                });
                                                                // Save event into database
                                                                event.save((err, event) => {
                                                                    // Check if error
                                                                    if (err) {
                                                                        // Check if error is a validation error
                                                                        if (err.errors) {
                                                                            // Check if validation error is in the category field
                                                                            place.remove((err) => {
                                                                                if (err) {
                                                                                    res.json({ success: false, message: eval(language + '.deletePlace.saveError'), err }); // Return general error message
                                                                                }
                                                                            });
                                                                            if (err.errors['title']) {
                                                                                res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                                            } else {
                                                                                if (err.errors['description']) {
                                                                                    res.json({ success: false, message: eval(language + err.errors['description'].message) }); // Return error message
                                                                                } else {
                                                                                    if (err.errors['observations']) {
                                                                                        res.json({ success: false, message: eval(language + err.errors['observations'].message) }); // Return error message
                                                                                    } else {
                                                                                        res.json({ success: false, message: err }); // Return general error message
                                                                                    }
                                                                                }

                                                                            }
                                                                        } else {
                                                                            res.json({ success: false, message: eval(language + '.newEvent.saveError'), err }); // Return general error message
                                                                        }
                                                                    } else {
                                                                        res.json({ success: true, message: eval(language + '.newEvent.success') }); // Return success message
                                                                    }
                                                                });
                                                            }
                                                            const place = new Place({
                                                                language: language,
                                                                province: {
                                                                    name: req.body.place.province,
                                                                    geonameId: req.body.place.geonameIdProvince
                                                                },
                                                                municipality: {
                                                                    name: req.body.place.municipality,
                                                                    geonameId: req.body.place.geonameIdMunicipality,
                                                                },
                                                                location: req.body.place.location,
                                                                coordinates: {
                                                                    lat: req.body.place.lat,
                                                                    lng: req.body.place.lng
                                                                },
                                                                createdAt: Date.now(),
                                                                updatedAt: Date.now()
                                                            });
                                                            Place.findOne({
                                                                language: language,
                                                                province: {
                                                                    name: req.body.place.province,
                                                                    geonameId: req.body.place.geonameIdProvince
                                                                },
                                                                municipality: {
                                                                    name: req.body.place.municipality,
                                                                    geonameId: req.body.place.geonameIdMunicipality,
                                                                },
                                                                location: req.body.place.location,
                                                                coordinates: {
                                                                    lat: req.body.place.lat,
                                                                    lng: req.body.place.lng
                                                                }
                                                            }, (err, findPlace) => {
                                                                // Check if error was found or not
                                                                if (err) {
                                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                                    var mailOptions = {
                                                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                                        to: [emailConfig.email], // list of receivers
                                                                        subject: ' Find 1 newEvent error ',
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
                                                                    // Check if place were found in database
                                                                    if (!findPlace) {
                                                                        // Save place into database
                                                                        place.save((err, place) => {
                                                                            // Check if error
                                                                            if (err) {
                                                                                // Check if error is a validation error         
                                                                                if (err.errors) {
                                                                                    console.log(err.errors);
                                                                                    // Check if validation error is in the category field
                                                                                    if (err.errors['location']) {
                                                                                        res.json({ success: false, message: eval(language + err.errors['location'].message) }); // Return error message
                                                                                    } else {
                                                                                        if (err.errors['coordinates.lat']) {
                                                                                            res.json({ success: false, message: eval(language + err.errors['coordinates.lat'].message) }); // Return error message
                                                                                        } else {
                                                                                            if (err.errors['coordinates.lng']) {
                                                                                                res.json({ success: false, message: eval(language + err.errors['coordinates.lng'].message) }); // Return error message
                                                                                            } else {
                                                                                                res.json({ success: false, message: err }); // Return general error message
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                    res.json({ success: false, message: eval(language + '.newPlace.saveError'), err }); // Return general error message
                                                                                }
                                                                            } else {
                                                                                eventSave(place);
                                                                            }
                                                                        });
                                                                    } else {
                                                                        eventSave(findPlace);
                                                                    }
                                                                }
                                                            });
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    /* ===============================================================
       GET ALL user events
    =============================================================== */
    router.get('/allUserEvents/:username/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.username) {
                res.json({ success: false, message: eval(language + '.allUserEvents.usernameProvidedError') }); // Return error
            } else {
                Event.find({
                    language: language,
                    createdBy: req.params.username
                }).sort({ 'start': 1 }).exec((err, events) => {
                    // Check if error was found or not
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find 1 allUserEvents error ',
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
                        // Check if events were found in database
                        if (!events) {
                            res.json({ success: false, message: eval(language + '.allUserEvents.eventsError') }); // Return error of no events found
                        } else {
                            res.json({ success: true, events: events }); // Return success and events array
                        }
                    }
                }); // Sort events from newest to oldest
            }
        }
    });
    /* ===============================================================
       GET Event
    =============================================================== */
    router.get('/getEvent/:id/:language', (req, res) => {
        var language = req.params.language;
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            if (!req.params.id) {
                res.json({ success: false, message: eval(language + '.getEvent.idProvidedError') }); // Return error
            } else {
                Event.findOne({
                    language: language,
                    _id: req.params.id
                }, (err, event) => {
                    // Check if error was found or not
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                            to: [emailConfig.email], // list of receivers
                            subject: ' Find 1 getEvent error ',
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
                        // Check if event were found in database
                        if (!event) {
                            res.json({ success: false, message: eval(language + '.getEvent.eventError') }); // Return error of no event found
                        } else {
                            Category.find({
                                language: language
                            }, (err, categories) => {
                                // Check if error was found or not
                                if (err) {
                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                    var mailOptions = {
                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                        to: [emailConfig.email], // list of receivers
                                        subject: ' Find 3 getEvent error ',
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
                                    // Check if categoryChild were found in database
                                    if (!categories) {
                                        res.json({ success: false, message: eval(language + '.getEvent.categoryError') }); // Return error of no event found
                                    } else {
                                        var categoryArray = [];

                                        function findCategory(childId) {
                                            for (var i in categories) {
                                                if (categories[i]._id == eval(childId)) {
                                                    return categories[i];
                                                }
                                            }
                                        }
                                        var child = findCategory('event.categoryId');
                                        categoryArray.unshift(child);
                                        while (child.parentId !== null) {
                                            child = findCategory('child.parentId');
                                            categoryArray.unshift(child);
                                        }

                                        Place.findOne({
                                            language: language,
                                            _id: event.placeId
                                        }, (err, place) => {
                                            // Check if error was found or not
                                            if (err) {
                                                // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                var mailOptions = {
                                                    from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                    to: [emailConfig.email], // list of receivers
                                                    subject: ' Find 4 getEvent error ',
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
                                                // Check if place were found in database
                                                if (!place) {
                                                    res.json({ success: false, message: eval(language + '.getEvent.placeError') }); // Return error of no event found
                                                } else {
                                                    res.json({ success: true, event: event, place: place, categories: categoryArray }); // Return success and event array
                                                }
                                            }
                                        });
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
    /* ===============================================================
        Route to update/edit a event
    =============================================================== */

    router.put('/editEvent', function(req, res) {
        var language = req.body.event.language;
        // Check if language was provided
        if (!language) {
            res.json({ success: false, message: "Ez da hizkuntza aurkitu" }); // Return error
        } else {
            // Check if id was provided
            if (!req.body.event.id) {
                res.json({ success: false, message: eval(language + '.editEvent.idProvidedError') }); // Return error
            } else {
                // Check if id was provided
                if (!req.body.event.createdBy) {
                    res.json({ success: false, message: eval(language + '.editEvent.createdByProvidedError') }); // Return error
                } else {
                    var editUser = req.body.event.createdBy; // Assign _id from event to be editted to a variable
                    if (req.body.event.createdBy) var newEventCreatedBy = req.body.event.createdBy; // Check if a change to createdBy was requested
                    if (req.body.event.categoryId) var newEventCategoryId = req.body.event.categoryId; // Check if a change to categoryId was requested
                    if (req.body.event.language) var newEventLanguage = req.body.event.language; // Check if a change to language was requested
                    if (req.body.event.title) var newEventTitle = req.body.event.title; // Check if a change to title was requested
                    if (req.body.event.participants) var newEventParticipants = req.body.event.participants; // Check if a change to participants was requested
                    if (req.body.event.start) var newEventStart = req.body.event.start; // Check if a change to start was requested
                    if (req.body.event.end) var newEventEnd = req.body.event.end; // Check if a change to end was requested
                    if (req.body.event.description) var newEventDescription = req.body.event.description; // Check if a change to description was requested
                    if (req.body.event.observations) var newEventObservations = req.body.event.observations; // Check if a change to observations was requested
                    if (req.body.event.participants) var newEventParticipants = req.body.event.participants; // Check if a change to participants was requested
                    if (req.body.event.imagesPoster) var newEventImagesPoster = req.body.event.imagesPoster; // Check if a change to imagesPoster was requested
                    if (req.body.event.imagesDescription) var newEventImagesDescription = req.body.event.imagesDescription; // Check if a change to imagesDescription was requeste
                    // Look for logged in user in database to check if have appropriate access
                    User.findOne({ _id: req.decoded.userId }, function(err, mainUser) {
                        if (err) {
                            // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                            var mailOptions = {
                                from: "Fred Foo 👻 <" + emailConfig.email + ">", // sender address
                                to: [emailConfig.email],
                                subject: ' Find one 1 edit event error ',
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
                                // Look for user in database
                                User.findOne({ username: editUser }, function(err, user) {
                                    if (err) {
                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                        var mailOptions = {
                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                            to: [emailConfig.email],
                                            subject: ' Find one 2 edit event error ',
                                            text: 'The following error has been reported in Kultura: ' + err,
                                            html: 'The following error has been reported in Kultura:<br><br>' + err
                                        }; // Function to send e-mail to myself
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
                                        // Check if user is in database
                                        if (!user) {
                                            res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                        } else {
                                            var saveErrorPermission = false;
                                            // Check if is owner
                                            if (mainUser._id.toString() === user._id.toString()) {} else {
                                                // Check if the current permission is 'admin'
                                                if (mainUser.permission === 'admin') {
                                                    // Check if user making changes has access
                                                    if (user.permission === 'admin') {
                                                        saveErrorPermission = language + '.general.adminOneError';
                                                    } else {}
                                                } else {
                                                    // Check if the current permission is moderator
                                                    if (mainUser.permission === 'moderator') {
                                                        // Check if contributor making changes has access
                                                        if (user.permission === 'contributor') {} else {
                                                            saveErrorPermission = language + '.general.adminOneError';
                                                        }
                                                    } else {
                                                        saveErrorPermission = language + '.general.permissionError';
                                                    }
                                                }
                                            }
                                            //check saveError permision to save changes or not
                                            if (saveErrorPermission) {
                                                res.json({ success: false, message: eval(saveErrorPermission) }); // Return error
                                            } else {
                                                Place.findOne({
                                                    language: language,
                                                    province: {
                                                        name: req.body.place.province,
                                                        geonameId: req.body.place.geonameIdProvince
                                                    },
                                                    municipality: {
                                                        name: req.body.place.municipality,
                                                        geonameId: req.body.place.geonameIdMunicipality,
                                                    },
                                                    location: req.body.place.location,
                                                    coordinates: {
                                                        lat: req.body.place.lat,
                                                        lng: req.body.place.lng
                                                    }
                                                }, (err, findPlace) => {
                                                    // Check if error was found or not
                                                    if (err) {
                                                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                        var mailOptions = {
                                                            from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                            to: [emailConfig.email], // list of receivers
                                                            subject: ' Find 1 newEvent error ',
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
                                                        function eventSave(place) {
                                                            // Look for event in database
                                                            Event.findOne({ _id: req.body.event.id }, function(err, event) {
                                                                if (err) {
                                                                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                                                                    var mailOptions = {
                                                                        from: "Fred Foo 👻" < +emailConfig.email + ">", // sender address
                                                                        to: [emailConfig.email],
                                                                        subject: ' Find one 3 edit event error ',
                                                                        text: 'The following error has been reported in Kultura: ' + err,
                                                                        html: 'The following error has been reported in Kultura:<br><br>' + err
                                                                    }; // Function to send e-mail to myself
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
                                                                    // Check if event is in database
                                                                    if (!event) {
                                                                        res.json({ success: false, message: eval(language + '.editUser.userError') }); // Return error
                                                                    } else {
                                                                        if (newEventCreatedBy)
                                                                            event.createdBy = newEventCreatedBy; // Assign new createdBy to event in database
                                                                        if (newEventCategoryId)
                                                                            event.categoryId = newEventCategoryId; // Assign new categoryId to event in database
                                                                        if (place._id)
                                                                            event.placeId = place._id; // Assign new placeId to event in database
                                                                        if (newEventLanguage)
                                                                            event.language = newEventLanguage; // Assign new language to event in database
                                                                        if (newEventTitle)
                                                                            event.title = newEventTitle; // Assign new title to event in database
                                                                        if (newEventParticipants)
                                                                            event.participants = newEventParticipants; // Assign new participants to event in database
                                                                        if (newEventStart)
                                                                            event.start = newEventStart; // Assign new start to event in database
                                                                        if (newEventEnd)
                                                                            event.end = newEventEnd; // Assign new end to event in database
                                                                        if (newEventDescription)
                                                                            event.description = newEventDescription; // Assign new description to event in database
                                                                        if (newEventObservations)
                                                                            event.observations = newEventObservations; // Assign new observations to event in database
                                                                        if (newEventParticipants)
                                                                            event.participants = newEventParticipants; // Assign new participants to event in database
                                                                        if (newEventImagesPoster)
                                                                            event.images.poster = newEventImagesPoster; // Assign new imagesPoster to event in database
                                                                        if (newEventImagesDescription)
                                                                            event.images.description = newEventImagesDescription; // Assign new imagesDescription to event in database
                                                                        event.updatedAt = Date.now();
                                                                        // Save event into database
                                                                        event.save((err, event) => {
                                                                            // Check if error
                                                                            if (err) {
                                                                                // Check if error is a validation error
                                                                                if (err.errors) {
                                                                                    // Check if validation error is in the category field
                                                                                    if (err.errors['title']) {
                                                                                        res.json({ success: false, message: eval(language + err.errors['title'].message) }); // Return error message
                                                                                    } else {
                                                                                        if (err.errors['description']) {
                                                                                            res.json({ success: false, message: eval(language + err.errors['description'].message) }); // Return error message
                                                                                        } else {
                                                                                            if (err.errors['observations']) {
                                                                                                res.json({ success: false, message: eval(language + err.errors['observations'].message) }); // Return error message
                                                                                            } else {
                                                                                                res.json({ success: false, message: err }); // Return general error message
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                } else {
                                                                                    res.json({ success: false, message: eval(language + '.editEvent.saveError'), err }); // Return general error message
                                                                                }
                                                                            } else {
                                                                                res.json({ success: true, message: eval(language + '.editEvent.success') }); // Return success message
                                                                            }
                                                                        });
                                                                    }
                                                                }
                                                            });
                                                        }
                                                        // Check if place were found in database
                                                        if (!findPlace) {
                                                            const place = new Place({
                                                                language: language,
                                                                province: {
                                                                    name: req.body.place.province,
                                                                    geonameId: req.body.place.geonameIdProvince
                                                                },
                                                                municipality: {
                                                                    name: req.body.place.municipality,
                                                                    geonameId: req.body.place.geonameIdMunicipality,
                                                                },
                                                                location: req.body.place.location,
                                                                coordinates: {
                                                                    lat: req.body.place.lat,
                                                                    lng: req.body.place.lng
                                                                },
                                                                createdAt: Date.now(),
                                                                updatedAt: Date.now()
                                                            });
                                                            // Save place into database
                                                            place.save((err, place) => {
                                                                // Check if error
                                                                if (err) {
                                                                    // Check if error is a validation error         
                                                                    if (err.errors) {
                                                                        console.log(err.errors);
                                                                        // Check if validation error is in the category field
                                                                        if (err.errors['location']) {
                                                                            res.json({ success: false, message: eval(language + err.errors['location'].message) }); // Return error message
                                                                        } else {
                                                                            if (err.errors['coordinates.lat']) {
                                                                                res.json({ success: false, message: eval(language + err.errors['coordinates.lat'].message) }); // Return error message
                                                                            } else {
                                                                                if (err.errors['coordinates.lng']) {
                                                                                    res.json({ success: false, message: eval(language + err.errors['coordinates.lng'].message) }); // Return error message
                                                                                } else {
                                                                                    res.json({ success: false, message: err }); // Return general error message
                                                                                }
                                                                            }
                                                                        }
                                                                    } else {
                                                                        res.json({ success: false, message: eval(language + '.newPlace.saveError'), err }); // Return general error message
                                                                    }
                                                                } else {
                                                                    eventSave(place);
                                                                }
                                                            });
                                                        } else {
                                                            eventSave(findPlace);
                                                        }
                                                    }
                                                });
                                            }
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });
    /* ===============================================================
           GET ALL events search
        =============================================================== */
    router.get('/allEventsSearch/:search?/:language', (req, res) => {
        var language = req.params.language;
        var search = req.params.search;
        if (!language) {
            res.json({ success: false, message: "No se encontro el lenguaje" }); // Return error
        } else {
            if (!search) {
                res.json({ success: false, message: eval(language + '.allEventsSearch.searchTermProvidedError') }); // Return error
            } else {
                // Search database for all events posts
                Event.find({
                    title: {
                        $regex: new RegExp(".*" + search + ".*", "i")
                    },
                    language:language
                }, (err, events) => {
                    // Check if error was found or not
                    if (err) {
                        // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                        var mailOptions = {
                            from: '"Fred Foo 👻" <mundoarqueologia@gmail.com>', // sender address
                            to: ['mundoarqueologia@gmail.com'],
                            subject: ' Find 1 allThemes error ',
                            text: 'The following error has been reported in the Mundoarqueologia: ' + err,
                            html: 'The following error has been reported in the Mundoarqueologia:<br><br>' + err
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
                        // Check if events were found in database
                        if (!events) {
                            res.json({ success: false, message: eval(language + '.allEventsSearch.eventsError') }); // Return error of no events found
                        } else {
                            res.json({ success: true, events: events }); // Return success and events array
                        }
                    }
                }).sort({ '_id': -1 }); // Sort events from newest to oldest

            }
        }

    });

    return router;
};