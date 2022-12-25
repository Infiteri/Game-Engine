export const c = document.querySelector("canvas").getContext("2d");

export default class Engine {
  constructor(width = innerWidth, height = innerHeight) {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.extraLoopCode = () => {};

    this.RAF = null;
    this.mainPlayer = {};

    this.gameObjects = [];
  }

  SetBackground(sprite) {
    this.AddGameObject(sprite);
  }

  AddGameObject(obj) {
    this.gameObjects.push(obj);
  }

  AddExtraLoopCode(code) {
    this.extraLoopCode = code;
  }

  MainPlayer(player) {
    this.mainPlayer = player;
  }

  MainPlayerUpdating() {
    this.mainPlayer.MainPlayer && this.mainPlayer.MainPlayer();
  }

  Loop() {
    this.RAF = requestAnimationFrame(this.Loop.bind(this));

    this.Color("white");

    this.RenderGameObjects();
    this.MainPlayerUpdating();

    this.extraLoopCode();
  }

  Color(color) {
    c.fillStyle = color;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  RenderGameObjects() {
    for (let i = 0; i < this.gameObjects.length; i++)
      this.gameObjects[i].Render();
  }

  Init() {
    this.Loop();
  }
}
