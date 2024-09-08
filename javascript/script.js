const mario = document.querySelector('.mario');
const obstacle = document.querySelector('.obstacle');
const restartButton = document.querySelector('#restart-button');
const scoreElement = document.querySelector('#score');
const startButton = document.getElementById('start-button');
const startScreen = document.getElementById('start-screen');
const gameContainer = document.getElementById('game-container');
let isJumping = false;
let isGameOver = false;
let score = 0;

startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';  // Hide the start screen
    gameContainer.style.display = 'block';  // Show the game
    moveObstacle();  // Start the game
});

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space' && !isJumping && !isGameOver) {
        jump();
    }
});

function jump() {
    let position = 100;
    isJumping = true;
    
    const upInterval = setInterval(() => {
        if (position >= 250) {
            clearInterval(upInterval);

            const downInterval = setInterval(() => {
                if (position <= 100) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    position -= 20;
                    mario.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            mario.style.bottom = position + 'px';
        }
    }, 20);
}

function moveObstacle() {
    let obstaclePosition = 800;
    
    const obstacleInterval = setInterval(() => {
        if (obstaclePosition <= 0) {
            obstaclePosition = 800;
            score++; // Increment score when Mario successfully passes the obstacle
            scoreElement.textContent = 'Score: ' + score;
        } else {
            obstaclePosition -= 10;
        }
        obstacle.style.left = obstaclePosition + 'px';

        // Collision detection
        const marioPosition = parseInt(window.getComputedStyle(mario).getPropertyValue('bottom'));
        if (obstaclePosition > 0 && obstaclePosition < 100 && marioPosition < 150) {
            clearInterval(obstacleInterval);
            isGameOver = true;
            restartButton.style.display = 'block';
        }
    }, 20);
}

function restartGame() {
    isGameOver = false;
    restartButton.style.display = 'none';
    obstacle.style.left = '800px'; 
    mario.style.bottom = '100px'; 
    score = 0; // Reset the score when the game is restarted
    scoreElement.textContent = 'Score: ' + score; // Reset the score display
    moveObstacle(); 
}

restartButton.addEventListener('click', restartGame);
