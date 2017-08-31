const express = require('express'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      config = require('./config'),
      app = express(),
      port = 3001;


// ========== MIDDLEWARE ========== //

// ===== TOP LEVEL MIDDLEWARE ===== //

app.use(bodyParser.json());
app.use(cors());


// ===== CUSTOM MIDDLEWARE ===== //



// ========== ENDPOINTS ========== //

// === GET REQUESTS === //

app.get('/api/home', (req, res) => {
    res.status(200).send("Working!");
})

// === PUT REQUESTS === //



// === POST REQUESTS === //



// === DELETE REQUESTS === //



app.listen(port, () => {
    console.log(`listening on port ${port}`)
})