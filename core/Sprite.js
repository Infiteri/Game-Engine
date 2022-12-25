import { c } from "./Engine.js";

export default class Sprite {
  constructor({
    position,
    src,
    scale = 1,
    frames = 1,
    updateEveryXFrames = 5,
    offset = { x: 0, y: 0 },
  }) {
    this.position = position;
    this.scale = scale;
    this.frames = frames;
    this.currentFrame = 0;
    this.framesElapsed = 0;
    this.updateEveryXFrames = updateEveryXFrames;
    this.offset = offset;

    //*: Image setup
    this.image = new Image();
    this.image.src = src;
    this.image.onload = () => {
      this.width = this.image.width;
      this.height = this.image.height;
    };
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

  UpdateAnimation() {
    this.framesElapsed++;

    if (this.framesElapsed % this.updateEveryXFrames === 0) {
      if (this.currentFrame < this.frames - 1) this.currentFrame++;
      else this.currentFrame = 0;
    }
  }
}
