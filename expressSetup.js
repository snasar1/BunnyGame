const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'));

// Set the views directory and view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

module.exports = { app, http, io };
