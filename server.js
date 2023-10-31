const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');
const fs = require('fs');
const sharedModule = require('./sharedModule');

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const levels = sharedModule.levels;

app.get('/', (req, res) => {
  res.render('index', { levels });
});

io.on('connection', socket => {
  socket.on('submitHighScore', ({ name, score }) => {
    // Handle high score submission here (update 'highScores' as needed)
    io.emit('updateHighScores', highScores);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
