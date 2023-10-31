const express = require('express');
const app = express();
const http = require('http').createServer(app);
const path = require('path');
const io = require('socket.io')(http);

// Require the shared module
const { levels, highScores } = require('./sharedModule');

const { app, http, io } = require('./expressSetup');

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'));

// Set the view engine and views directory for rendering templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Load levels data from a JSON file and initialize an empty array for high scores
const levels = require('./level.json');
let highScores = [];

// Define a route for the root URL and render the 'index' view with levels and highScores
app.get('/', (req, res) => {
  res.render('index', { levels, highScores });
});

// Listen for socket.io connections and handle high score submissions
io.on('connection', socket => {
  socket.on('submitHighScore', ({ name, score }) => {
    // Add the submitted high score to the array and sort scores in descending order
    highScores.push({ name, score });
    highScores.sort((a, b) => b.score - a.score);

    // Keep only the top 'maxScores' high scores
    const maxScores = 10;
    highScores = highScores.slice(0, maxScores);

    // Emit updated high scores to all connected clients
    io.emit('updateHighScores', highScores);
  });
});

// Define the port to listen on, using process.env.PORT if available, or default to 3000
const port = process.env.PORT || 3000;

// Start the HTTP server
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
