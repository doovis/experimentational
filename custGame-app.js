import { Character } from "./custGame-character.js";
import { Wall } from "./custGame-wall.js";
import { Map } from "./custGame-map.js";

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");
const player = new Character(60, 140, false);
let wall = new Wall();
let map = new Map();
let firstGame = true;
let lastTime;

window.addEventListener("keydown", controls);
window.addEventListener("keyup", controls);

function update(time) {
  // clearing canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (lastTime == null) {
    lastTime = time;
    requestAnimationFrame(update);
  }
  const delta = time - lastTime;

  if (wall.wallChange()) {
    wall = new Wall();
  }

  // wall
  wall.draw(ctx, canvas);
  wall.collision(player);

  // Player
  if (!firstGame) player.draw(ctx);

  if (!player.dead) {
    player.update(keyboard, canvas);
  }

  if (player.dead || firstGame) {
    deathScreen();
  } else {
    wall.move(map.wallSpeedIncrease());
  }

  // scores
  map.drawScore(ctx, canvas, wall.walls.x);

  lastTime = time;
  requestAnimationFrame(update);
}

requestAnimationFrame(update);

const keyboard = {
  up: false,
};

function controls(e) {
  if (e.type == "keydown" && !e.repeat) {
    if (e.code == "Space") {
      keyboard.up = true;
    }
  }

  if (e.type == "keyup") {
    if (e.code == "Space") {
      keyboard.up = false;
    }
  }

  /*
  if (e.type == "keydown") {
    if (e.key == "d") {
      keyboard.right = true;
    }
    if (e.key == "a") {
      keyboard.left = true;
    }
    if (e.code == "Space") {
      keyboard.up = true;
    }
    if (e.key == "s") {
      keyboard.down = true;
    }
  }
  */

  /*
  if (e.type == "keyup") {
    if (e.key == "d") {
      keyboard.right = false;
    }
    if (e.key == "a") {
      keyboard.left = false;
    }
    if (e.code == "Space") {
      keyboard.up = false;
    }
    if (e.key == "s") {
      keyboard.down = false;
    }
  }
  */
}

function deathScreen() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "28px Arial";
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255, 255, 255, 1)";
  ctx.fillText("Press Any Key To Start", canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "rgba(0, 0, 0, 1)";
  ctx.font = "20px Arial";
  ctx.textAlign = "left";

  window.addEventListener(
    "keypress",
    function startGame() {
      player.y = 170;
      player.dy = 0;
      player.dead = false;
      firstGame = false;
      map.wallSpeed = 1;
      map.currentScore = 0;
      wall = new Wall();
      wall.start();
    },
    { once: true }
  );
}
