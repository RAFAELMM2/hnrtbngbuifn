const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const playerId = "player_" + Math.floor(Math.random() * 99999);
let players = {};

let x = Math.random() * 700 + 50;
let y = Math.random() * 500 + 50;
const speed = 3;
const size = 30;

const keys = {};

document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);

// Firebase: registra jogador
const playerRef = db.ref("players/" + playerId);
playerRef.set({ x, y });
playerRef.onDisconnect().remove();

// Firebase: escuta todos os jogadores
db.ref("players").on("value", (snapshot) => {
  players = snapshot.val() || {};
});

function update() {
  if (keys["ArrowLeft"] || keys["a"]) x -= speed;
  if (keys["ArrowRight"] || keys["d"]) x += speed;
  if (keys["ArrowUp"] || keys["w"]) y -= speed;
  if (keys["ArrowDown"] || keys["s"]) y += speed;

  // atualiza posição no banco
  playerRef.set({ x, y });
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let id in players) {
    const p = players[id];
    ctx.fillStyle = id === playerId ? "lime" : "red";
    ctx.fillRect(p.x, p.y, size, size);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
