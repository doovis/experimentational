export class Wall {
  walls = { x: 620, hole: Math.round(Math.random() * 70 + 15), y1: 0, y2: 0 };

  start() {
    this.walls.x = 620;
  }

  draw(ctx, canvas) {
    this.wall(ctx, this.walls.x, this.walls.hole, canvas);
  }

  collision(player) {
    if (
      this.walls.x < player.x + player.width &&
      this.walls.x + 40 > player.x &&
      this.walls.y1 > player.y
    ) {
      player.dead = true;
    }

    if (
      this.walls.x < player.x + player.width &&
      this.walls.x + 40 > player.x &&
      this.walls.y2 < player.y + player.height
    ) {
      player.dead = true;
    }
  }

  wall(ctx, x, Hole, canvas) {
    const wallLength = canvas.height;
    const holePos = wallLength * (Hole / 100);

    this.walls.y1 = holePos - 60;
    this.walls.y2 = wallLength - (wallLength - holePos - 60);
    ctx.fillStyle = "green";
    ctx.fillRect(x, 0, 40, holePos - 60);
    ctx.fillRect(x, wallLength, 40, -(wallLength - holePos - 60));
    ctx.fillStyle = "black";
  }

  move(dx) {
    this.walls.x -= dx;
  }

  wallChange() {
    if (this.walls.x + 40 < 0) {
      this.walls.x = 620;
      return true;
    }
  }
}
