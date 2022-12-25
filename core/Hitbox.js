import { c } from "./Engine.js";

export default class Hitbox {
  constructor({ position, width, height }) {
    this.position = position;
    this.width = width;
    this.height = height;
  }

  Render() {
    c.fillStyle = "rgba(0, 0, 255, 0.5)";
    c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
}
