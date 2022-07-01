export class Map {
  wallSpeed = 1;
  wallSuccess = false;
  currentScore = 0;
  highScore = localStorage.getItem("highscore")
    ? localStorage.getItem("highscore")
    : 0;

  wallSpeedIncrease() {
    return (this.wallSpeed += 0.0004);
  }

  drawScore(ctx, canvas, wallX) {
    ctx.fillText(`Score: ${this.currentScore}`, 5, 25);
    ctx.textAlign = "right";
    ctx.fillText(`Highscore: ${this.highScore}`, canvas.width - 30, 25);
    ctx.textAlign = "left";

    if (wallX + 40 < 60 && this.wallSuccess === false) {
      this.currentScore++;
      this.wallSuccess = true;
    }

    if (wallX + 40 > 60) this.wallSuccess = false;

    this.updateHighscore();
  }

  updateHighscore() {
    if (this.currentScore > this.highScore) {
      this.highScore = this.currentScore;
      localStorage.setItem("highscore", this.highScore);
    }
  }
}
