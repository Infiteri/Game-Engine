import Engine from "./core/Engine.js";
import GameObject from "./core/GameObject.js";
import Hitbox from "./core/Hitbox.js";
import Level from "./core/Level.js";
import Sprite from "./core/Sprite.js";

//Create the engine
const engine = new Engine(1024, 576);
const level = new Level();

const hitbox = [
  new Hitbox({
    position: {
      x: 0,
      y: 480,
    },
    width: 1024,
    height: 100,
  }),
];

const player = new GameObject({
  position: {
    x: 0,
    y: 0,
  },

  src: "assets/samuraiMack/Idle.png",
  frames: 8,
  scale: 2.5,
  offset: {
    x: 215,
    y: 110,
  },

  //Animations
  sprites: {
    Idle: {
      src: "assets/samuraiMack/Idle.png",
      frames: 8,
    },
    Run: {
      src: "assets/samuraiMack/Run.png",
      frames: 8,
    },
    Jump: {
      src: "assets/samuraiMack/Jump.png",
      frames: 8,
    },
    Fall: {
      src: "assets/samuraiMack/Fall.png",
      frames: 8,
    },
  },
});

const bg = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  src: "assets/background.png",
  frames: 1,
  scale: 1,
});

engine.SetBackground(bg);

const shop = new Sprite({
  position: {
    x: 650,
    y: 128,
  },

  src: "assets/shop.png",
  scale: 2.75,
  frames: 6,
});

engine.AddGameObject(shop);

engine.AddGameObject(player);
engine.MainPlayer(player);
// engine.SetBackground(bg)

//If we wanna add extra code for the engine to loop that isn't a function in the engine class we can
engine.AddExtraLoopCode(() => {
  hitbox[0].Render();
  player.Floor(hitbox[0]);

  if (player.keys.a || player.keys.d) player.PlayAnimation("Run");
  else if (!player.keys.a || !player.keys.d) player.PlayAnimation("Idle");

  if (player.velocity.y < 0) {
    player.PlayAnimation("Jump");
  } else if (player.velocity.y > 0) {
    player.PlayAnimation("Fall");
  }
});

//Run
engine.Init();
