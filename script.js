const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const playerId = "player_" + Math.floor(Math.random() * 100000);
let players = {};

const speed = 2;
let keys = {};

let x = Math.random() * 700 + 50;
let y = Math.random() * 500 + 50;

// Atualiza posição no Firebase
const playerRef = db.ref("players/" + playerId);
playerRef.set({ x, y });
playerRef.onDisconnect().remove();

// Lê jogadores do banco
db.ref("players").on("value", (snapshot) => {
  players = snapshot.val() || {};
});

// Controle do teclado
document.addEventListener('keydown', e => keys[e.key] = true);
document.addEventListener('keyup', e => keys[e.key] = false);

// Loop do jogo
function gameLoop() {
  // Movimento
  if (keys["ArrowLeft"] || keys["a"]) x -= speed;
  if (keys["ArrowRight"] || keys["d"]) x += speed;
  if (keys["ArrowUp"] || keys["w"]) y -= speed;
  if (keys["ArrowDown"] || keys["s"]) y += speed;

  // Atualiza posição no Firebase
  playerRef.set({ x, y });

  // Desenha jogadores
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let id in players) {
    const p = players[id];
    ctx.fillStyle = id === playerId ? "lime" : "red";
    ctx.fillRect(p.x, p.y, 30, 30);
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();
