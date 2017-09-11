const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive'),
      AWS = require('aws-sdk'),
      config = require('./config'),
      app = express(),
      port = 3001;


// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //


app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use(session({
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

massive({
  host: config.DB_HOST,
  port: config.DB_PORT,
  database: config.DB_DATABASE,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  ssl: true
}).then( db => {
  app.set('db', db);
})

app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
  domain: config.AUTH_DOMAIN,
  clientID: config.AUTH_CLIENT_ID,
  clientSecret: config.AUTH_CLIENT_SECRET,
  callbackURL: config.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

  const db = app.get('db');

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

AWS.config.update({
  accessKeyId: config.AWS_ACCESS_KEY,
  secretAccessKey: config.AWS_SECRET_KEY,
  region: config.AWS_REGION
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
    successRedirect: 'http://192.168.0.43:3000/#/home',
    failureRedirect: 'http://192.168.0.43:3000/#/'
}))

// ===== CUSTOM MIDDLEWARE ===== //

app.get('/auth/me', (req, res, next) => {
    console.log('req.USER', req.user)
    return res.status(200).send(req.user);


})

app.get('/auth/logout', (req,res) => {
    console.log(`user ${req.user.id} has logged out`)
    req.logOut();
    return res.redirect(302, 'http://192.168.0.43:3000/#/')
})

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

// === PUT REQUESTS === //

app.put('/api/userHasViewedMemory/:id', (req, res) => {
    console.log(`user ${req.user.id} has viewed a memory. ID: ${req.params.id}`)
    app.get('db').userHasViewedMemory([req.params.id, req.user.id]).then((response) => {
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
        return res.status(200).send(response);
    })
})

app.post('/api/newRelationship', (req, res) => {
    console.log(`relationship request: Sent from user ${req.user.id} to user ${req.body.userId} -- status pending`)

    app.get('db').checkRelationship([req.user.id, req.body.userId]).then((response) => {
        console.log(response)
        if (response.length > 0 || req.user.id === req.body.userId) {
            return res.send({
                status: 409,
                message: "bad request - relationship already exists"
            });
        } else {
            app.get('db').newRelationship([req.user.id, req.body.userId]).then((response) => {
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



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})