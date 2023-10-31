# BunnyGame


```markdown
# Bunny Game

Bunny Game is a classic snake game where you control a cute bunny to collect carrots while avoiding collisions with walls and yourself. The game has multiple levels, each with a different speed and challenge.


## Features

- Multiple levels with increasing difficulty.
- Real-time score tracking.
- High score leaderboard.

## How to Play

1. Use the arrow keys to control the bunny's movement.
2. Collect carrots to increase your score.
3. Avoid running into the walls or your own body.

## Levels

The game features multiple levels, each with its own speed setting. You can select the level you want to play from the "Level Menu" and start the game.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine.

### Prerequisites

- Web browser (Google Chrome, Mozilla Firefox, etc.)
- Node.js and npm (for the server version)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/snasar1/BunnyGame.git
```

2. Navigate to the project directory:

```bash
cd bunny-game
```

3. For the client-only version, open the `index.html` file in your browser. You can also deploy this on a static web server.

4. For the server version:

   - Install the necessary packages:

   ```bash
   npm install
   ```

   - Start the server:

   ```bash
   node server.js
   ```

5. Access the game in your web browser by visiting `http://localhost:3000`.

## Credits

This game was built with HTML, CSS, and JavaScript. It also uses the [Socket.io](https://socket.io/) library for high score submissions.
