import GameObject from "./GameObject.js";
import Sprite from "./Sprite.js";

export const c = document.querySelector("canvas").getContext("2d");

/**
 * @class Engine : the core of the engine, used to load game objects and maybe levels in the future
 * @TODO : add levels and level loading
 */

export default class Engine {
  constructor(width = innerWidth, height = innerHeight) {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = width;
    this.canvas.height = height;

    this.extraLoopCode = () => {};

    this.RAF = null;
    this.mainPlayer = {};

    this.gameObjects = [];
    this.levelClass = undefined;
  }

  /**
   * @function SetBackground : sets the game background to a specific sprite / image
   * @argument {Sprite} sprite
   */

  SetBackground(sprite) {
    this.AddGameObject(sprite);
  }

  /**
   * @function AddGameObject : pushes to the Engine.gameObject array
   * Must have a "Render" function
   */

  AddGameObject(obj) {
    this.gameObjects.push(obj);
  }

  /**
   * @function AddExtraLoopCode : the Engine.extraCodeLoop variable will be set to the "code" argument and the Engine.extraCodeLoop function (by default is a empty function) will be called in the engine "Loop" function
   */

  AddExtraLoopCode(code) {
    this.extraLoopCode = code;
  }

  /**
   * @function MainPlayer : will set the main player of the level [In making] to the passed argument
   * @argument {GameObject} player
   */

  MainPlayer(player) {
    this.mainPlayer = player;
  }

  /**
   * @function MainPlayerUpdating : will check if the Engine.mainPlayer has the MainPlayer function and calls it;
   * The Engine.mainPlayer variable is set by using the Engine.MainPlayer function
   */

  MainPlayerUpdating() {
    this.mainPlayer.MainPlayer && this.mainPlayer.MainPlayer();
  }

  /**
   * @function Loop : main function loop;
   */
  Loop() {
    this.RAF = requestAnimationFrame(this.Loop.bind(this));

    this.Color("white");

    this.RenderGameObjects();
    this.MainPlayerUpdating();

    this.extraLoopCode();
  }

  /**
   * @function Color : sets the canvas background to a specific color;
   * @argument {string} color
   */

  Color(color) {
    c.fillStyle = color;
    c.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * @function RenderGameObjects : renders all game objects;
   */

  RenderGameObjects() {
    for (let i = 0; i < this.gameObjects.length; i++)
      this.gameObjects[i].Render();
  }

  /**
   * @function Init : will set the engine main state;
   */

  Init() {
    this.Loop();
  }
}
