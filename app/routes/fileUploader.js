const jwt = require('jsonwebtoken'); // Compact, URL-safe means of representing claims to be transferred between two parties.
var aws = require('aws-sdk');
var multer = require('multer'); //require multer for the file uploads
var multerS3 = require('multer-s3');
var FroalaEditor = require('wysiwyg-editor-node-sdk');
const config = require('../config/aws'); // Import database configuration
const es = require('../translate/es'); // Import translate es
const eu = require('../translate/eu'); // Import translate eu
const en = require('../translate/en'); // Import translate en
const nodemailer = require('nodemailer');
const emailConfig = require('../config/email'); // email
module.exports = (router) => {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // secure:true for port 465, secure:false for port 587
        auth: {
            user: emailConfig.email,
            pass: emailConfig.password
        }
    });

    router.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header("Access-Control-Allow-Credentials", true);
        next();
    });
    var s3 = new aws.S3(config);


    /* ===============================================================
        GET S3 options
    =============================================================== */
    router.get('/getSignatureFroala', (req, res) => {
        var configs = {
            // The name of your bucket.
            bucket: 'culture-bucket',

            // S3 region. If you are using the default us-east-1, it this can be ignored.
            region: config.region,

            // The folder where to upload the images.
            keyStart: 'description/',

            // File access.
            acl: 'public-read',
            // AWS keys.
            accessKey: config.accessKeyId,
            secretKey: config.secretAccessKey
        };

        var s3Hash = FroalaEditor.S3.getHash(configs);
        //res.send(s3Hash);
        res.json({ success: true, options: s3Hash }); // Return connection error
    });

    /* ===============================================================
       POST file uploader
    =============================================================== */
    router.post('/uploadImages/:bucket', function(req, res, next) {
        var bucket=req.params.bucket;
        var upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: 'culture-bucket/'+bucket,
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                metadata: function(req, file, cb) {
                    cb(null, { fieldName: file.fieldname });
                },
                key: function(req, file, cb) {
                    cb(null, Date.now().toString() + "_" + file.originalname);
                }
            })
        }).array(bucket, 10);

        upload(req, res, function(err) {
            var language = req.body.language;
            if (!language) {
                language = "es";
            }
            if (err) {
                res.json({ success: false, message: eval(language + '.fileUpload.uploadError') });
            } else {
                res.json({ success: true, file: req.files, message: eval(language + '.fileUpload.uploadSuccess') });
            }
        });

    });
    /* ===============================================================
       DELETE image file uploader
    =============================================================== */
    router.delete('/deleteImages/:imageId/:bucket/:language', function(req, res, next) {
        var language = req.params.language;
        var imageId = req.params.imageId;
        var bucket = "culture-bucket/" + req.params.bucket;
        if (!language) {
            language = "es";
        }
        console.log(imageId);
        console.log(bucket);
        if (!imageId) {
            res.json({ success: false, message: eval(language + '.fileUpload.keyError') });
        } else if (!bucket) {
            res.json({ success: false, message: eval(language + '.fileUpload.bucketError') });
        } else {
            s3.deleteObject({
                Bucket: bucket,
                Key: imageId
            }, function(err, data) {
                if (err) {
                    // Create an e-mail object that contains the error. Set to automatically send it to myself for troubleshooting.
                    var mailOptions = {
                        from: emailConfig.email,
                        to: emailConfig.email,
                        subject: 'Error deleteImages',
                        text: 'The following error has been reported in File Upload part: ' + 'Date:' + Date.now().toString() + err,
                        html: 'The following error has been reported in the File Upload part:<br><br>' + 'Date:' + Date.now().toString() + err
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
                    res.json({ success: false, message: eval(language + '.fileUpload.deleteError') });
                } else {
                    res.json({ success: true, message: eval(language + '.fileUpload.deleteSuccess') });
                }

            });
        }

    });
    return router;
};