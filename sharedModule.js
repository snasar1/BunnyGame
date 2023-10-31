const fs = require('fs');
const levels = JSON.parse(fs.readFileSync('level.json'));

let highScores = [];

module.exports = { levels, highScores };
