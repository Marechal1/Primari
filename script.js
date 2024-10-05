const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
const snake = [{ x: 200, y: 200 }];
let direction = "RIGHT";
let food = { x: Math.floor(Math.random() * (canvasSize / box)) * box, y: Math.floor(Math.random() * (canvasSize / box)) * box };
let score = 0;

// Controle de direção
document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
    if (event.keyCode === 37 && direction !== "RIGHT") direction = "LEFT";
    else if (event.keyCode === 38 && direction !== "DOWN") direction = "UP";
    else if (event.keyCode === 39 && direction !== "LEFT") direction = "RIGHT";
    else if (event.keyCode === 40 && direction !== "UP") direction = "DOWN";
}

// Desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);
    // Desenhar a cobra
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? "lightgreen" : "green";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }
    // Desenhar a comida
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    // Movimentar a cobra
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === "LEFT") snakeX -= box;
    if (direction === "UP") snakeY -= box;
    if (direction === "RIGHT") snakeX += box;
    if (direction === "DOWN") snakeY += box;

    // Verificar se a cobra comeu a comida
    if (snakeX === food.x && snakeY === food.y) {
        score++;
        food = { x: Math.floor(Math.random() * (canvasSize / box)) * box, y: Math.floor(Math.random() * (canvasSize / box)) * box };
    } else {
        snake.pop(); // Remover a última parte da cobra
    }

    // Verificar colisões
    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(snakeX, snakeY, snake)) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    let newHead = { x: snakeX, y: snakeY };
    snake.unshift(newHead); // Adicionar nova cabeça
}

function collision(x, y, array) {
    for (let i = 0; i < array.length; i++) {
        if (x === array[i].x && y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(drawGame, 100);
