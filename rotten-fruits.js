const rottenFruitImages = [
  "./images/rotten-apple.png",
  "./images/rotten-banana.png",
  "./images/rotten-strawberry.png",
  "./images/rotten-orange.png",
  "./images/rotten-pear.png",
  "./images/rotten-grapes.png",
  "./images/rotten-peach.png",
  "./images/rotten-watermelon.png",
  "./images/rotten-lemon.png",
  "./images/rotten-pineapple.png",
  "./images/rotten-cherries.png",
  "./images/rotten-kiwi.png"
];


class RottenFruit {
  constructor() {
    this.node = document.createElement("div");
    gameBox.append(this.node);

    this.node.className = "rotten-fruit";

    this.width = 35;
    this.height = 35;

    this.x = Math.floor(Math.random() * (gameBox.clientWidth - this.width));
    this.y = 0;

    this.speed = 3;

    let randomIndex = Math.floor(Math.random() * rottenFruitImages.length);
    let rottenFruitImg = document.createElement("img");

rottenFruitImg.src = rottenFruitImages[randomIndex];

rottenFruitImg.style.width = "100%";
rottenFruitImg.style.height = "100%";
rottenFruitImg.style.objectFit = "contain";

this.node.append(rottenFruitImg);
this.node.style.position = "absolute";
this.node.style.left = `${this.x}px`;
this.node.style.top = `${this.y}px`;
this.node.style.width = `${this.width}px`;
this.node.style.height = `${this.height}px`;
  }

  

automaticMovement() {
  this.y += this.speed;
  this.node.style.top = `${this.y}px`;
}
}

let rottenFruitsArr = [];

function addRottenFruit() {
      console.log("Creating rotten fruit!");

  let newRottenFruit = new RottenFruit();
  rottenFruitsArr.push(newRottenFruit);
}

let rottenFruitIntervalId = null;