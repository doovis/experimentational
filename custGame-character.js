export class Character {
  constructor(X, Y, Dead) {
    this.x = X;
    this.y = Y;
    this.dead = Dead;
  }
  dx = 0;
  dy = 0;
  width = 20;
  height = 20;

  jumpPower = 12;
  gravity = 0.25;
  fallSpeed = 2.5;
  friction = 0.91;

  update(keyboard, canvas) {
    if (this.dy < this.fallSpeed) this.dy += this.gravity;
    this.y += this.dy;
    this.dy *= this.friction;

    if (this.y + this.height > canvas.height || this.y < 0) {
      this.dead = true;
    }

    if (keyboard.up) {
      this.dy -= this.jumpPower;
      keyboard.up = false;
    }
  }

  draw(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
