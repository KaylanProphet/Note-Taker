// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
const routes = require('./routes/routes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Setup data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/',(req,res)=>{
    res.send('hello world')
})

//(app);

// Setup listener
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});  