const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'));

// Set the views directory and view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Load levels data from 'level.json'
const levels = JSON.parse(fs.readFileSync('level.json'));

// Define a route for the root URL and render the 'index' view with levels
app.get('/', (req, res) => {
  res.render('index', { levels });
});

// Listen for socket.io connections and handle high score submissions
io.on('connection', socket => {
  socket.on('submitHighScore', ({ name, score }) => {
    // Handle high score submission here (update 'highScores' as needed)
    io.emit('updateHighScores', highScores); // Emit updated high scores to all connected clients
  });
});

// Define the port to listen on, using process.env.PORT if available, or default to 3000
const port = process.env.PORT || 3000;

// Start the HTTP server and listen on the specified port
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
