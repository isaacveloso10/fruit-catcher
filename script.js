const startScreen = document.getElementById("start-screen");
const startBtn = document.getElementById("start-btn");
const gameScreen = document.getElementById("game-screen");
const menuBtn = document.getElementById("menu-btn");
const restartBtn = document.getElementById("restart-btn");
const gameOverScreen = document.getElementById("game-over-screen");
const gameBox = document.getElementById("game-box");
const scoreElement = document.getElementById("score");
const livesElement = document.getElementById("lives");
const finalScoreElement = document.getElementById("final-score");
const bestScoreElement = document.getElementById("best-score");
const timerElement = document.getElementById("timer");

const collectSound = new Audio("./sounds/collect.wav");
const rottenSound = new Audio("./sounds/rotten.wav");
const loseLifeSound = new Audio("./sounds/lose-life.wav");
const gameOverSound = new Audio("./sounds/game-over.wav");
const backgroundMusic = new Audio("./sounds/background.wav");

backgroundMusic.loop = true;
backgroundMusic.volume = 0.7;


startBtn.addEventListener("click", () => {
    startScreen.style.display = "none";
    gameScreen.style.display = "flex";
        addBasket();
        addFruit();
        fruitIntervalId = setInterval(addFruit, 2000);
        mainIntervalId = setInterval(gameLoop, Math.round(1000 / 60));

        addRottenFruit();

        rottenFruitIntervalId = setInterval(addRottenFruit, 5000);
        timerIntervalId = setInterval(countdown, 1000);

        backgroundMusic.currentTime = 0;
        backgroundMusic.play();

});

menuBtn.addEventListener("click", () => {
  // Stop all game intervals
  clearInterval(mainIntervalId);
  clearInterval(fruitIntervalId);
  clearInterval(rottenFruitIntervalId);
  clearInterval(timerIntervalId);

  // Reset game values
  score = 0;
  lives = 3;
  timeLeft = 120;

  // Update the scoreboard
  scoreElement.innerText = `Score: ${score}`;
  livesElement.innerText = `Lives: ${lives}`;
  timerElement.innerText = "02:00";
  timerElement.classList.remove("warning");

  // Remove normal fruits
  fruitsArr.forEach((fruit) => {
    fruit.node.remove();
  });
  fruitsArr = [];

  // Remove rotten fruits
  rottenFruitsArr.forEach((rottenFruit) => {
    rottenFruit.node.remove();
  });
  rottenFruitsArr = [];

  // Return to Main Menu
  startScreen.style.display = "flex";
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "none";
});

restartBtn.addEventListener("click", () => {
  gameScreen.style.display = "flex";
  gameOverScreen.style.display = "none";
  
   
  fruitsArr.forEach((fruit) => {
  fruit.node.remove();

  backgroundMusic.currentTime = 0;
    backgroundMusic.play();
});

fruitsArr = [];
  

    score = 0;
    lives = 3;

    scoreElement.innerText = `Score: ${score}`;
    livesElement.innerText = `Lives: ${lives}`;

    addBasket();
    addFruit();

  mainIntervalId = setInterval(gameLoop, Math.round(1000 / 60));
  fruitIntervalId = setInterval(addFruit, 2000);

  addRottenFruit();
rottenFruitIntervalId = setInterval(addRottenFruit, 5000);

rottenFruitsArr.forEach((rottenFruit) => {
  rottenFruit.node.remove();
});

rottenFruitsArr = [];

timeLeft = 120;
timerElement.innerText = "02:00";

timerIntervalId = setInterval(countdown, 1000);

timerElement.classList.remove("warning");

});

window.addEventListener("keydown", (event) => {
  if (basketObj === null) {
    return;
  }

  if (event.code === "ArrowLeft") {
    basketObj.moveLeft();
  } else if (event.code === "ArrowRight") {
    basketObj.moveRight();
  }
});

let timeLeft = 120;
let timerIntervalId = null;

function countdown() {
  timeLeft -= 1;

  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;

  timerElement.innerText = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  if (timeLeft <= 0) {
    gameOver();
  }
  if (timeLeft <= 10) {
  timerElement.classList.add("warning");
}
}

function checkCollision(element1, element2) {
  return (
    element1.x < element2.x + element2.width &&
    element1.x + element1.width > element2.x &&
    element1.y < element2.y + element2.height &&
    element1.y + element1.height > element2.y
  );
}
function gameLoop() {
  fruitsArr.forEach((fruit) => {
    fruit.automaticMovement();
  });
   rottenFruitsArr.forEach((rottenFruit) => {
    rottenFruit.automaticMovement();
  });

    checkCollisionBasketFruit();
    checkFruitDespawn();
    checkCollisionBasketRottenFruit();
    checkRottenFruitDespawn();


}
let score = 0;

function checkCollisionBasketFruit() {
  fruitsArr.forEach((fruit) => {
    if (checkCollision(fruit, basketObj)) {
      console.log("Fruit caught!");

      fruit.node.remove();
      fruitsArr.splice(fruitsArr.indexOf(fruit), 1);

      collectSound.currentTime = 0;
        collectSound.play();

      score += 10;
        scoreElement.innerText = `Score: ${score}`;
        
    }
  });
}





function checkCollisionBasketRottenFruit() {
  rottenFruitsArr.forEach((rottenFruit) => {
    if (checkCollision(rottenFruit, basketObj)) {
      rottenFruit.node.remove();

      rottenFruitsArr.splice(
        rottenFruitsArr.indexOf(rottenFruit),
        1
      );
      rottenSound.currentTime = 0;
        rottenSound.play();

      lives -= 1;
      livesElement.innerText = `Lives: ${lives}`;

      if (lives <= 0) {
        gameOver();
      }
    }
  });
}


let lives = 3;

function checkFruitDespawn() {
  fruitsArr.forEach((fruit) => {
    if (fruit.y > gameBox.clientHeight) {
      fruit.node.remove();
      fruitsArr.splice(fruitsArr.indexOf(fruit), 1);

      loseLifeSound.currentTime = 0;
        loseLifeSound.play();

      lives -= 1;
      livesElement.innerText = `Lives: ${lives}`;

      if (lives <= 0) {
        gameOver();
}
    }
  });
}

function checkRottenFruitDespawn() {
  rottenFruitsArr.forEach((rottenFruit) => {
    if (rottenFruit.y > gameBox.clientHeight) {
      rottenFruit.node.remove();
      rottenFruitsArr.splice(rottenFruitsArr.indexOf(rottenFruit), 1);
    }
  });
}

let bestScore = Number(localStorage.getItem("bestScore")) || 0;

function gameOver() {
  gameScreen.style.display = "none";
  gameOverScreen.style.display = "flex";

  backgroundMusic.pause();
   gameOverSound.currentTime = 0;
  gameOverSound.play();

  clearInterval(mainIntervalId);
  clearInterval(fruitIntervalId);
  clearInterval(rottenFruitIntervalId);

  finalScoreElement.innerText = `Score: ${score}`;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem("bestScore", bestScore);
  }

  bestScoreElement.innerText = `Best Score: ${bestScore}`;

  clearInterval(timerIntervalId);
}


