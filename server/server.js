const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      config = require('./config'),
      passport = require('passport'),
      Auth0Strategy = require('passport-auth0'),
      app = express(),
      port = 3001;


// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());


// ===== CUSTOM MIDDLEWARE ===== //

passport.use(new Auth0Strategy({
  domain: config.AUTH_DOMAIN,
  clientID: config.AUTH_CLIENT_ID,
  clientSecret: config.AUTH_CLIENT_SECRET,
  callbackURL: config.AUTH_CALLBACK
}, function(accessToken, refreshToken, extraParams, profile, done) {

//   const db = app.get('db');

//   db.find_user([ profile.identities[0].user_id ])
//   .then( user => {
//    if ( user[0] ) {

//      return done( null, { id: user[0].id } );

//    } else {

//      db.create_user([profile.displayName, profile.emails[0].value, profile.picture, profile.identities[0].user_id])
//      .then( user => {
//         return done( null, { id: user[0].id } );
//      })

//    }
//   })

done(null, profile);

}));

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/home',
    failureRedirect: 'http://localhost:3000/'
}))

passport.serializeUser((user, done) => {
    console.log(`USER ID IS ${user.identities[0].user_id}`);
    // console.log(session.Store)
    done(null, user);
})

passport.deserializeUser((obj, done) => {
    done(null, obj);
})

app.get('/auth/me', (req, res, next) => {
    // console.log(req.user)
    if (!req.user) {
        return res.status(404).send('User not found');
    } else {
        // console.log(`SUCCESSFULLY STORED USER INFORMATION! USER_ID IS ${req.user}`)
        return res.status(200).send(req.user);
    }
})

// ========== ENDPOINTS ========== //

// === GET REQUESTS === //


// === PUT REQUESTS === //



// === POST REQUESTS === //



// === DELETE REQUESTS === //



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})