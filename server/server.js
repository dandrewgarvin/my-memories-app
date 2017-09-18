require ('dotenv').config();

const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive'),
      AWS = require('aws-sdk'),
      twilio = require('twilio'),
      nodemailer = require('nodemailer'),
      app = express(),
      port = 3001;


// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use( express.static( `${__dirname}/../build`))

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));


massive({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CLIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

  const db = app.get('db');
  console.log('profile is:', profile)

  db.find_user([ profile._json.email ])
  .then( user => {
   if ( user[0] ) {
    //    console.log(user[0])
     return done( null, { user: user[0] } );
   }
    else {
        if (profile.provider === 'auth0') {
            let date = new Date()
            db.create_user([ profile._json.user_metadata.first_name, profile._json.user_metadata.last_name, profile._json.email, profile.identities[0].user_id, date ])
            .then( user => {
                return done( null, { user: user[0] } );
            })
        } else {
            let date = new Date()
            db.create_user([ profile._json.given_name, profile._json.family_name, profile._json.email, profile.identities[0].user_id, date ])
            .then( user => {
                return done( null, { user: user[0] } );
            })
        }
    }
  })

}));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = new twilio(accountSid, authToken);

const nodemailerAccount = process.env.NODEMAILER_ACCOUNT
const transporter = nodemailer.createTransport(nodemailerAccount)

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION
})

passport.serializeUser(function(user, done){
    user = user.user
    let sessionUser = {id: user.id, first: user.first_name, last: user.last_name, email: user.email}
    done(null, sessionUser);
})

passport.deserializeUser(function(user, done){
    app.get('db').find_session_user([user.id]).then( userDeserialize => {
        done(null, userDeserialize[0]);
    })
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/#/home',
    failureRedirect: '/#/'
}))


app.get('/auth/me', (req, res, next) => {
    console.log('req.USER', req.user)
    return res.status(200).send(req.user);
})

app.get('/auth/logout', (req,res) => {
    console.log(`user ${req.user.id} has logged out`)
    req.logOut();
    return res.redirect(302, '/#/')
})

// ===== CUSTOM MIDDLEWARE ===== //

// ========== ENDPOINTS ========== //

// === REDIRECTS === //


// === GET REQUESTS === //

app.get('/api/getMemoriesByUser', (req, res) => {
    console.log(`user ${req.user.id} is viewing their memories`)
    app.get('db').getMemoriesByUserId([req.user.id]).then((response) => {
        return res.status(200).send(response);
    })
})

app.get('/api/getUserInfo', (req, res) => {
    if (!req.user) {
        return res.status(200).send({
            message: 'not logged in',
            status: 400
        });
    }
    console.log(`user ${req.user.id} has logged in`)
    app.get('db').getUserInfo([req.user.id]).then((response) => {
        return res.status(200).send(response);
    })
})

app.get('/api/totalUnreadMemoriesById', (req, res) => {
    app.get('db').totalUnreadMemoriesById([req.user.id]).then((response) => {
        return res.status(200).send(response[0])
    })
})

app.get('/api/getRelationships', (req, res) => {
    app.get('db').getRelationships([req.user.id]).then((response) => {
        return res.status(200).send(response);
    })
})

app.get('/api/findUserConnection', (req, res) => {
    app.get('db').findUserConnection([req.query.input]).then((response) => {
        return res.status(200).send(response);
    })
})

app.get('/api/getRequests', (req, res) => {
    if (req.user) {
        app.get('db').getRequests([req.user.id]).then((response) => {
            return res.status(200).send(response);
        })
    }
})

// === PUT REQUESTS === //

app.put('/api/userHasViewedMemory/:id', (req, res) => {
    console.log(`user ${req.user.id} has viewed a memory. ID: ${req.params.id}`)
    app.get('db').userHasViewedMemory([req.params.id, req.user.id]).then((response) => {
        return res.status(200).send(response);
    })
})

app.put('/api/updateRequest', (req, res) => {
    app.get('db').updateRequest([req.body.relationshipStatus, req.body.relationshipId, req.user.id]).then((response) => {
        console.log(`relationship status changed. user ${req.user.id} acted on relationship id ${req.body.relationshipStatus}`)
        res.status(200).send(response);
    })
})

app.put('/api/updateUserProfile', (req, res) => {
    console.log([...req.body, req.user.id])
    app.get('db').updateUserProfile([...req.body, req.user.id]).then((response) => {
        return res.status(200).send(response);
    })
})

// === POST REQUESTS === //

app.post('/api/submitMemory', (req, res) => {
    let meme = []
    for (var prop in req.body){
        meme.push(req.body[prop])
    }
    console.log(`user ${req.user.id} has submitted a memory to user ${meme[1]}`)

    app.get('db').createMemory(meme).then((response) => {
        if (response[1].notification_preference >= 2 &&  response[1].phone) {
            let number = '+1' + response[1].phone
            console.log(`Notification text sent to ${response[1].first_name} ${response[1].last_name}: ${number}`)
            client.messages.create({
                to: number,
                from: twilioNumber,
                body:"You have a new memory in your inbox! Login to your MyMemories Account to view it. This is an automated message from MyMemoriesApp. Please do not respond."
            }, (error, message) => { if (error) console.log('Oops! There was an error sending a text notification.', error) });
        } 
        if (response[1].notification_preference === 1 || response[1].notification_preference === 3) {
            var email = response[1].email
            let mailOptions = {
                from: '"MyMemories Automated Email" <mymemoriesemailer@gmail.com>',
                to: email,
                subject: 'You have a new memory!',
                text: 'You have a new memory in your inbox! Login to your MyMemories Account to view it. This is an automated message from MyMemoriesApp. Please do not respond.',
                html: '<h1 style="text-align: center; color: #FA7C92">You have a new memory!</h1><p style="text-align: center; color: #6ABBCE"> To view this new memory, please log into your MyMemoriesApp account. If you have any questions, please feel free to response to this emai.</p><br><p style="color: #666;">Thank you,</p><p style="color: #666; font-weight: bold;">The MyMemories Team</p>'
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error)
                }
                console.log(`Notification email sent to ${response[1].first_name} ${response[1].last_name}: ${email}`)
            })
        } 
        // else {
        //     console.log('The user receiving memories cannot receive text/email notifications.')
        // }
        return res.status(200).send(response);
    })
})

app.post('/api/newRelationship', (req, res) => {

    let userIds = [];
    if (req.user.id > req.body.userId) userIds = [req.body.userId, req.user.id]
    else userIds = [req.user.id, req.body.userId]

    app.get('db').checkRelationship(userIds).then((response) => {
        if (response.length > 0 || req.user.id === req.body.userId) {
            console.log(`relationship request: Sent from user ${req.user.id} to user ${req.body.userId} -- status blocked -- relationship already exists`)
            return res.send({
                status: 409,
                message: "That relationship already exists. Choose another user."
            });
        } else {
            app.get('db').newRelationship([...userIds, req.user.id]).then((response) => {
                console.log(`relationship request: Sent from user ${req.user.id} to user ${req.body.userId} -- status pending -- relationship request sent`)
                return res.status(200).send({
                    message: "good request - request was sent",
                    status: 200
                });
            })
        }
    })
})

// == AWS IMAGE UPLOAD == //

const s3 = new AWS.S3();
app.post('/api/uploadImage', (req, res) => {
    const buf = new Buffer(req.body.imageUrl.replace(/^data:image\/\w+;base64,/, ""), 'base64');

  const bucketName = 'mymemoriesapp';
  const params = {
    Bucket: bucketName, //name of AWS s3 bucket
    Key: req.body.imageName, //name of the image, including extension
    Body: buf, //base64 encoded image
    ContentType: req.body.imageFile, //type of file -- extension
    ACL: 'public-read'
  }

  s3.upload(params, (err, data) => {
   if (err) return res.status(500).send(err);
   console.log(`user ${req.user.id} has uploaded an image`)
   res.status(200).json(data);
 })
})

// === DELETE REQUESTS === //


const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '..','build','index.html'));
})

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})