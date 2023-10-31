const expressSetup = require('./expressSetup');
const sharedModule = require('./sharedModule');
const app = expressSetup.app;
const http = expressSetup.http;
const io = expressSetup.io;

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
