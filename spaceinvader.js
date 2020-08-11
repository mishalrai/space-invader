// @file spaceinvader.js
// @description A simple space invader game using JS
// @license MIT
// @author Deepesh Khanal

let gameCanvas = document.getElementById("spaceInvader"),
    ctx = gameCanvas.getContext("2d"),
    canvasWidth = gameCanvas.width,
    canvasHeight = gameCanvas.height,
    canvasHalfWidth = gameCanvas.width / 2,
    canvasHalfHeight = gameCanvas.height / 2,
    jetX = canvasHalfWidth - 32,
    jetY = canvasHeight - 80,
    jetMomentum = 4,
    bulletX = canvasHalfWidth,
    bulletY = canvasHeight - 95,
    bulletCount = 15,
    bullets = [],
    ballRadius = 8,
    bulletMomentum = 2,
    alienCount = 10,
    moveRight = false,
    moveLeft = false;

const jetWidth = jetHeight = 64;

function drawHeroJet() {
    if (moveRight) {
        jetX += jetMomentum;
        if (jetX + jetWidth > canvasWidth) {
            jetX = canvasWidth - jetWidth;
        }
        ctx.clearRect(0, jetY, canvasWidth, canvasHeight);
    } else if (moveLeft) {
        jetX -= jetMomentum;
        if (jetX < 0) {
            jetX = 0;
        }
        ctx.clearRect(0, jetY, canvasWidth, canvasHeight);
    }

    const image = new Image();
    image.src = "images/rocket.png";
    image.onload = () => {
        ctx.drawImage(image, jetX, jetY);
    }
}

function drawJetBullet() {
    ctx.clearRect(0, 0, canvasWidth, jetY);
    for(var i = 0; i < bulletCount; i++){
        ctx.beginPath();
        if(typeof bullets[i] == "undefined"){
            bullets[i] = { 'y' : bulletY};
        }
        ctx.arc(bulletX, bullets[i]['y'] - (i*40), ballRadius, 0, Math.PI * 2, true);
        bullets[i]['y'] -= bulletMomentum;
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();        
    }
}

function drawAliens(){
    for(var i = 1; i <= alienCount; i++){
        ctx.beginPath();
        ctx.rect(i*43, 20, 30, 30);
        ctx.rect(i*44, 60, 28, 28);
        ctx.rect(i*45, 100, 26, 26);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.stroke();
    }
}

function initializeGame() {
    drawHeroJet();
    drawJetBullet();
    drawAliens();
    attachKeyboardEvents();
}

function attachKeyboardEvents() {
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        moveRight = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        moveRight = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        moveLeft = false;
    }
}


setInterval(initializeGame, 10);



