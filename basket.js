class Basket {
  constructor() {
    this.node = document.getElementById("basket");

    this.width = 100;
    this.height = 60;

    this.x = (gameBox.clientWidth - this.width) / 2;
    this.y = gameBox.clientHeight - this.height - 20;

    this.speed = 20;
  }
  moveLeft() {
  this.x -= this.speed;

  if (this.x < 0) {
    this.x = 0;
  }

  this.node.style.left = `${this.x}px`;
}
moveRight() {
  this.x += this.speed;

  if (this.x > gameBox.clientWidth - this.width) {
    this.x = gameBox.clientWidth - this.width;
  }

  this.node.style.left = `${this.x}px`;
}

}

function addBasket() {
  basketObj = new Basket();

  basketObj.node.style.left = `${basketObj.x}px`;
  basketObj.node.style.top = `${basketObj.y}px`;
}