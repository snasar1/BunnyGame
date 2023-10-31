// Initialize game variables
const gameBoard = document.getElementById('game-board');
const scoreElement = document.getElementById('score');
const levelDisplay = document.getElementById('level');
// const levelMenuButton = document.getElementById('menu-button');
// const levelMenu = document.getElementById('level-menu');

const gridSize = 20;

let bunny = [{ x: 5, y: 5 }];
let food = { x: 10, y: 10 };
let direction = 'right';
let changingDirection = false;
let score = 0;
let level = 1;

const levels = [
  { level: 1, speed: 150 },
  { level: 2, speed: 140 },
  { level: 3, speed: 130 },
  { level: 4, speed: 120 },
  { level: 5, speed: 110 },
  { level: 6, speed: 100 },
  { level: 7, speed: 90 },
  { level: 8, speed: 80 },
  { level: 9, speed: 70 },
  { level: 10, speed: 60 },
];

let foodCount = 0;
let gameInterval;
let bunnySpeed = levels[level - 1].speed;

// Create the game board
function createGameBoard() {
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.setAttribute('data-x', x);
      cell.setAttribute('data-y', y);
      gameBoard.appendChild(cell);
    }
  }
}

// Clear the game board
function clearGameBoard() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach(cell => {
    cell.classList.remove('bunny', 'food');
  });
}

// Draw the bunny on the game board
function drawBunny() {
  bunny.forEach(segment => {
    const cell = document.querySelector(`.cell[data-x="${segment.x}"][data-y="${segment.y}"]`);
    cell.classList.add('bunny');
  });
}

// Draw the food on the game board
function drawFood() {
  const foodCell = document.querySelector(`.cell[data-x="${food.x}"][data-y="${food.y}"]`);
  foodCell.classList.add('food');
}

// Move the bunny
function moveBunny() {
  const head = { ...bunny[0] };

  switch (direction) {
    case 'up':
      head.y--;
      break;
    case 'down':
      head.y++;
      break;
    case 'left':
      head.x--;
      break;
    case 'right':
      head.x++;
      break;
  }

  bunny.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score++;
    foodCount++;
    updateScore();
    generateFood();
  } else {
    bunny.pop();
  }
}

// Generate food
function generateFood() {
  food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
  };

  const bunnyBody = new Set(bunny.map(segment => `${segment.x}-${segment.y}`));
  if (bunnyBody.has(`${food.x}-${food.y}`)) {
    generateFood();
  }
}

// Check for collisions
function checkCollision() {
  const head = bunny[0];
  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
    endGame();
  }

  const bunnyBody = new Set(bunny.map(segment => `${segment.x}-${segment.y}`));
  bunnyBody.delete(`${head.x}-${head.y}`);
  if (bunnyBody.has(`${head.x}-${head.y}`)) {
    endGame();
  }
}

// End the game
function endGame() {
  clearInterval(gameInterval);
  alert(`Game Over! Your score: ${score}`);
  resetGame();
}

// Reset the game
function resetGame() {
  bunny = [{ x: 5, y: 5 }];
  food = { x: 10, y: 10 };
  direction = 'right';
  score = 0;
  clearGameBoard();
  drawBunny();
  drawFood();
  gameInterval = setInterval(updateGame, bunnySpeed);
}

// Update the game
function updateGame() {
  changingDirection = false;
  clearGameBoard();
  moveBunny();
  checkCollision();
  drawBunny();
  drawFood();
  checkLevelCompletion();
}

// Check if the level is completed
function checkLevelCompletion() {
  if (foodCount === 5) {
    increaseLevel();
  }
}

// Increase the level
function increaseLevel() {
  foodCount = 0;
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  clearInterval(gameInterval);
  bunnySpeed = levels[level - 1].speed;
  gameInterval = setInterval(updateGame, bunnySpeed);
}

// Update the score display
function updateScore() {
  scoreElement.textContent = `Score: ${score}`;
}

// Handle keyboard input for controlling the bunny
document.addEventListener('keydown', e => {
  if (changingDirection) return;
  changingDirection = true;

  const key = e.key;
  switch (key) {
    case 'ArrowUp':
      if (direction !== 'down') direction = 'up';
      break;
    case 'ArrowDown':
      if (direction !== 'up') direction = 'down';
      break;
    case 'ArrowLeft':
      if (direction !== 'right') direction = 'left';
      break;
    case 'ArrowRight':
      if (direction !== 'left') direction = 'right';
      break;
  }
});

// Initialize the game
createGameBoard();
drawBunny();
drawFood();
gameInterval = setInterval(updateGame, bunnySpeed);

/* Show the level menu
levelMenuButton.addEventListener('click', () => {
  levelMenu.style.display = 'block';
});

*/

// Handle level button clicks
const levelButtonsContainer = document.querySelector('.level-buttons');

// Set the current level
function setLevel(selectedLevel) {
  level = selectedLevel;
  levelDisplay.textContent = `Level: ${level}`;
  bunnySpeed = levels[level - 1].speed;
  //levelMenu.style.display = 'none';
  resetGame();
}

/* Restart the game
function restartGame() {
  levelMenu.style.display = 'block';
}
*/

// Attach event listeners to level buttons
const levelButtons = document.querySelectorAll('.level-button');
for (const button of levelButtons) {
  button.addEventListener('click', () => {
    const selectedLevel = parseInt(button.dataset.level);
    setLevel(selectedLevel);
  });
  levelButtonsContainer.appendChild(button);
}

// Restart button event listener
const restartButton = document.getElementById('restart-button');
restartButton.addEventListener('click', restartGame);
