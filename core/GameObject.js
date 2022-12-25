import { c } from "./Engine.js";
import Sprite from "./Sprite.js";

export default class GameObject {
  constructor({
    position = { x: 0, y: 0 },
    src,
    scale = 1,
    frames = 1,
    updateEveryXFrames = 5,
    offset = { x: 0, y: 0 },
    sprites = {},
  }) {
    this.position = position;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.updateEveryXFrames = updateEveryXFrames;
    this.offset = offset;
    this.sprites = sprites;

    //*: Image setup
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };

    this.velocity = {
      x: 0,
      y: 1,
    };
    this.gravity = 0.5;
    this.friction = 0.2;

    this.jumpForce = -12;
    this.speed = 7;

    this.keys = {
      a: false,
      d: false,
      w: false,
    };

    for (const sprite in this.sprites) {
      this.sprites[sprite].image = new Image();
      this.sprites[sprite].image.src = this.sprites[sprite].src;
    }
  }

  PlayAnimation(key) {
    if (this.image !== this.sprites[key].image) {
      this.image = this.sprites[key].image;
      this.frames = this.sprites[key].frames;
      this.updateEveryXFrames = this.sprites[key].updateEveryXFrames || 10;
      this.currentFrame = 0;
    }
  }

  Floor(hitbox) {
    if (
      this.position.y + this.height + this.velocity.y >=
      hitbox.position.y - 0.01
    ) {
      this.velocity.y = 0;
    }
  }

  Update() {
    const canvas = document.querySelector("canvas");

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y <= canvas.height) {
      this.velocity.y += this.gravity;
    } else this.velocity.y = 0;
  }

  /**
   * @function MainPlayer : used by the engine class; calls all the needed function to make a playable main player
   */
  MainPlayer() {
    this.Update();

    this.KeyUpdate();

    //Movement
    this.VerticalMovement();
    this.HorizontalMovement();
  }

  KeyUpdate() {
    addEventListener("keydown", ({ code }) => {
      if (code === "KeyA") this.keys.a = true;
      else if (code === "KeyD") this.keys.d = true;

      if (code === "KeyW") this.keys.w = true;
    });

    addEventListener("keyup", ({ code }) => {
      if (code === "KeyA") this.keys.a = false;
      else if (code === "KeyD") this.keys.d = false;

      if (code === "KeyW") this.keys.w = false;
    });
  }

  /**
   * TODO: Make sure that the friction doesn't affect the collusion
   */
  HorizontalMovement() {
    //TODO: Determine if the speed should be rounded || but i don't think it needs due to the velocity.x prop which we can use || WILL SEE
    if (this.keys.a) this.velocity.x = -this.speed;
    else if (this.keys.d) this.velocity.x = this.speed;
    else this.velocity.x *= this.friction;
  }

  VerticalMovement() {
    addEventListener("keydown", ({ code }) => {
      if (code === "KeyW") this.velocity.y = this.jumpForce;
    });
  }

  UpdateAnimation() {
    this.framesElapsed++;

    if (this.framesElapsed % this.updateEveryXFrames === 0) {
      if (this.currentFrame < this.frames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }

  Render() {
    this.UpdateAnimation();
    c.drawImage(
      this.image,
      this.currentFrame * (this.width / this.frames),
      0,
      this.width / this.frames,
      this.height,
      this.position.x - this.offset.x,
      this.position.y - this.offset.y,
      (this.width / this.frames) * this.scale,
      this.height * this.scale
    );
  }
}
