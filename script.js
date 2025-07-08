const playerId = "player_" + Math.floor(Math.random() * 100000);
let players = {};

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#1abc9c",
  physics: {
    default: "arcade"
  },
  scene: {
    create,
    update
  }
};

let game = new Phaser.Game(config);
let cursors;
let playerRef;
let playersSprites = {};

function create() {
  cursors = this.input.keyboard.createCursorKeys();

  // Referência do jogador atual
  playerRef = database.ref("players/" + playerId);
  playerRef.set({ x: 100, y: 100 });
  playerRef.onDisconnect().remove();

  // Escuta todos os jogadores
  database.ref("players").on("value", snapshot => {
    const data = snapshot.val() || {};

    // Remove sprites antigos
    for (let id in playersSprites) {
      playersSprites[id].destroy();
    }

    playersSprites = {};

    // Cria novos sprites
    for (let id in data) {
      const playerData = data[id];
      const color = id === playerId ? 0x00ff00 : 0xff0000;
      playersSprites[id] = this.add.rectangle(playerData.x, playerData.y, 30, 30, color);
    }

    players = data;
  });
}

function update() {
  const speed = 3;
  let p = players[playerId];
  if (!p) return;

  let x = p.x;
  let y = p.y;

  if (cursors.left.isDown) x -= speed;
  if (cursors.right.isDown) x += speed;
  if (cursors.up.isDown) y -= speed;
  if (cursors.down.isDown) y += speed;

  database.ref("players/" + playerId).set({ x, y });
}
