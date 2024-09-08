const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let food = { x: 5 * gridSize, y: 5 * gridSize };
let dx = gridSize;
let dy = 0;
let score = 0;
let isGameOver = false;

function gameLoop() {
    if (isGameOver) return;

    setTimeout(() => {
        clearCanvas();
        moveSnake();
        checkCollision();
        drawFood();
        drawSnake();
        drawScore();
        gameLoop();
    }, 100);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let segment of snake) {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function moveSnake() {
    let newHead = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(newHead);

    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
}

function checkCollision() {
    const head = snake[0];
    if (
        head.x < 0 ||
        head.x >= canvas.width ||
        head.y < 0 ||
        head.y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        isGameOver = true;
        ctx.fillStyle = 'black';
        ctx.font = '40px Arial';
        ctx.fillText('Game Over', canvas.width / 4, canvas.height / 2);
    }
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount) * gridSize,
        y: Math.floor(Math.random() * tileCount) * gridSize
    };
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (dy === 0) { dx = 0; dy = -gridSize; }
            break;
        case 'ArrowDown':
            if (dy === 0) { dx = 0; dy = gridSize; }
            break;
        case 'ArrowLeft':
            if (dx === 0) { dx = -gridSize; dy = 0; }
            break;
        case 'ArrowRight':
            if (dx === 0) { dx = gridSize; dy = 0; }
            break;
    }
});

gameLoop();
