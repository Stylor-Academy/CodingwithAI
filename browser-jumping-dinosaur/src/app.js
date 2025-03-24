const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let dinosaur;
let obstacles = [];
let score = 0;
let isJumping = false;
let jumpHeight = 0;

function startGame() {
    dinosaur = new Dinosaur();
    obstacles.push(new Obstacle());
    requestAnimationFrame(gameLoop);
}

function jump() {
    if (!isJumping) {
        isJumping = true;
        jumpHeight = 0;
        requestAnimationFrame(jumpLoop);
    }
}

function jumpLoop() {
    if (jumpHeight < 100) {
        jumpHeight += 5;
        dinosaur.y -= 5;
        requestAnimationFrame(jumpLoop);
    } else {
        fall();
    }
}

function fall() {
    if (dinosaur.y < canvas.height - dinosaur.height) {
        dinosaur.y += 5;
        requestAnimationFrame(fall);
    } else {
        isJumping = false;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dinosaur.draw();
    updateObstacles();
    checkCollision();
    score++;
    ctx.fillText("Score: " + score, 10, 20);
    requestAnimationFrame(gameLoop);
}

function updateObstacles() {
    for (let i = 0; i < obstacles.length; i++) {
        obstacles[i].x -= 5;
        obstacles[i].draw();
        if (obstacles[i].x < -obstacles[i].width) {
            obstacles.splice(i, 1);
            i--;
        }
    }
    if (Math.random() < 0.01) {
        obstacles.push(new Obstacle());
    }
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (dinosaur.x < obstacle.x + obstacle.width &&
            dinosaur.x + dinosaur.width > obstacle.x &&
            dinosaur.y < obstacle.y + obstacle.height &&
            dinosaur.y + dinosaur.height > obstacle.y) {
            alert("Game Over! Your score: " + score);
            document.location.reload();
        }
    }
}

class Dinosaur {
    constructor() {
        this.width = 50;
        this.height = 50;
        this.x = 50;
        this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Obstacle {
    constructor() {
        this.width = 20;
        this.height = 40;
        this.x = canvas.width;
        this.y = canvas.height - this.height;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.code === 'Space') {
        jump();
    }
});

startGame();