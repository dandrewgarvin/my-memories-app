const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      session = require('express-session'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      massive = require('massive'),
      config = require('./config'),
      app = express(),
      port = 3001;


// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //


app.use(bodyParser.json());
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

  //
  // Fix the db response. Need to authenticate user using auth0 (mostly done)
  // then store the user information in sessions. This will allow us to display
  // all the user information on the front-end. Also needs to be stored in redux
  // for easier access to the information.
  //

  db.find_user([ profile._json.email ])
  .then( user => {
      console.log("user is:",user[0])
   if ( user[0] ) {
    //    console.log(user[0])
     return done( null, { user: user[0] } );
   }
    else {
        db.create_user([ profile._json.given_name, profile._json.family_name, profile._json.email, profile.identities[0].user_id ])
        .then( user => {
            // console.log(user[0])
            return done( null, { user: user[0] } );
        })
    }
  })

}));

passport.serializeUser(function(user, done){
    user = user.user
    console.log("serialize", user)
    let sessionUser = {id: user.id, first: user.first_name, last: user.last_name, email: user.email}
    console.log("sessionUser", sessionUser)
    done(null, sessionUser);
})

passport.deserializeUser(function(user, done){
    console.log("deserialize", user)
    app.get('db').find_session_user([user.id]).then( userDeserialize => {
        console.log('user deserialization', userDeserialize)
        done(null, userDeserialize[0]);
    })
})


// ===== CUSTOM MIDDLEWARE ===== //


app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/home',
    failureRedirect: 'http://localhost:3000/#/'
}))


app.get('/auth/me', (req, res, next) => {
    console.log('req.SESSION', req.session)
    console.log('req.USER', req.user)
    console.log('req.SESIONSTORE', req.sessionStore)

    // if (!req.sessionStore.passport) {
    //     // console.log('USER WAS NOT FOUND')
    //     return res.status(404).send('User not found');
    // } else {
    //     // console.log(`SUCCESSFULLY STORED USER INFORMATION! USER_ID IS ${req.sessionStore.passport.user}`)
        return res.status(200).send(req.user);
    // }

})

// ========== ENDPOINTS ========== //

// === GET REQUESTS === //


// === PUT REQUESTS === //



// === POST REQUESTS === //



// === DELETE REQUESTS === //



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})