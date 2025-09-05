const canvas = document.querySelector("#gameCanvas");
const context = canvas.getContext("2d");

const dpr = window.devicePixelRatio || 1;
canvas.width = window.innerWidth * dpr/2;
canvas.height = window.innerHeight * dpr/2;
context.scale(dpr, dpr);
const pocketSize = 48;
const centerX = (canvas.width / dpr) / 2;

let ball = {
    x: canvas.width / 2 / dpr,
    y: canvas.height / 2 / dpr,
    radius: 10,
    speed: 8,
    dx: 0,
    dy: 0
};

let colorData = [];
function getColors() {
    return fetch('https://random-flat-colors.vercel.app/api/random?count=49')
    .then(function (response) {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
    }).then(function(data) {
        colorData = data.colors;
        console.log("Loaded", data.length, "colors");
    }).catch(error => console.error('Fetch error:', error));
}

function getRandomColor() {
    if (!colorData.length) return "blue";
    const rn = Math.floor(Math.random() * colorData.length);
    context.fillStyle = colorData[rn];
    console.log(colorData[rn]);
}

function spawnBall() {
    const angle = Math.random() * 2 * Math.PI;
    ball.dx = Math.cos(angle) * ball.speed;
    ball.dy = Math.sin(angle) * ball.speed;
}

function newBall() {
    ball.x = canvas.width / 2 / dpr;
    ball.y = canvas.height / 2 / dpr;
}

function drawBall() {
    context.beginPath();
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
}

let hitcounter = 0;
function update() {
    context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x - ball.radius < 24 || ball.x + ball.radius > ((canvas.width / dpr)-24)) {
        ball.dx *= -1;
        const angle = Math.random() * 2 * Math.PI;
        ball.dy += Math.sin(angle)*4;
        getRandomColor();
        drawBackground();
        hitcounter++;
    }

    if (ball.y - ball.radius < 24 || ball.y + ball.radius > ((canvas.height / dpr)-24)) {
        ball.dy *= -1;
        const angle = Math.random() * 2 * Math.PI;
        ball.dx += Math.cos(angle)*4;    
        getRandomColor();
        drawBackground();
        hitcounter++;
    }

    if ((ball.x - ball.radius < pocketSize && ball.y - ball.radius < pocketSize) 
        ||(Math.abs(ball.x - centerX) < 36 && ball.y - ball.radius < pocketSize) 
        ||(ball.x + ball.radius > canvas.width/dpr - pocketSize && ball.y - ball.radius < pocketSize) 
        ||(ball.x - ball.radius < pocketSize && ball.y + ball.radius > canvas.height/dpr - pocketSize) 
        ||(Math.abs(ball.x - centerX) < 36 && ball.y + ball.radius > canvas.height/dpr - pocketSize) 
        ||(ball.x + ball.radius > canvas.width/dpr - pocketSize && ball.y + ball.radius > canvas.height/dpr - pocketSize)) {
        newBall();
        spawnBall(); 
        getRandomColor(); 
        hitcounter++;
    }

    if(hitcounter >= 49) {
        hitcounter = 0;
        getColors();
    }
    drawBall();
    requestAnimationFrame(update);
}

getColors();
spawnBall();
update();
