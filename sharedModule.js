const fs = require('fs');

// Load levels data from 'level.json'
const levels = JSON.parse(fs.readFileSync('level.json'));

// Initialize highScores
let highScores = [];

module.exports = { levels, highScores };
