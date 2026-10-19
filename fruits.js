class Fruit {
  constructor() {
    this.node = document.createElement("div");
    gameBox.append(this.node);

    this.node.className = "fruit";

    // Position and dimensions
    this.width = 35;
    this.x = Math.floor(Math.random() * (gameBox.clientWidth - this.width));
    this.y = 0;
    
    this.height = 35;

    // Appearance
    const fruitImages = [
            "./images/apple.png",
             "./images/banana.png",
             "./images/strawberry.png",
            "./images/orange.png",
            "./images/watermelon.png",
            "./images/grapes.png",
             "./images/pineapple.png",
            "./images/cherries.png",
            "./images/lemon.png",
            "./images/blueberries.png"
        ];
    let randomIndex = Math.floor(Math.random() * fruitImages.length);
    let fruitImg = document.createElement("img");

        fruitImg.src = fruitImages[randomIndex];
        fruitImg.style.width = "100%";
        fruitImg.style.height = "100%";
        fruitImg.style.objectFit = "contain";

        this.node.append(fruitImg);



    // Positioning
    this.node.style.position = "absolute";
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.speed = 2;
  }
  automaticMovement() {
  this.y += this.speed;
  this.node.style.top = `${this.y}px`;
}
}

let fruitsArr = [];


function addFruit() {
  let newFruit = new Fruit();
  fruitsArr.push(newFruit);
}



let fruitIntervalId = null;

