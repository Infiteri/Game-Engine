//Will try to remake space invaders using my engine; Will upload this file when im stuck and make list of why im stuck
/**
 * Things I have done :
 * Create a square class
 * Made it so you don't have to go in the Engine class to change the background color or call Engine.Color in a loop;
 * made it by making a variable named color (by default = "#fff") and made the function color change it;
 * in the loop function I made it so that it would draw a rect on the entire canvas with the color that is set
 * Added a RenderArray Function
 * Fixed some animation problems (having image width problems)
 * To much to say 
 * TODO: FInish the game
 */

import { Engine } from "./core/Engine.js";
import GameObject from "./core/GameObject.js";
import Grid from "./core/Grid.js";
import Circle from "./core/primitives/Circle.js";

const engine = new Engine();
let frame = 0;

const projectiles = [];
engine.AddRenderArray(projectiles);

const player = new GameObject({
  position: {
    x: engine.WIDTH / 2,
    y: engine.HEIGHT - 150,
  },

  src: "assets/space/spaceship.png",
  scale: 0.5,
});

player.gravity = 0;
player.speed = 15;

const grids = [];

engine.AddGameObject(player);
engine.MainPlayer(player);

engine.AddUpdateArray(grids);
engine.AddUpdateArray(projectiles);

engine.AddExtraLoopCode(() => {
  player.HorizontalMovement();
  frame++;

  //Spawn a new grid of invaders every 120 frames (a.k.a every 2 seconds [since one second = 60 frames; two seconds = 120 frames])
  //a.k.a the game goes in 60 fps (frames per second)
  if (frame % 120 === 0) {
    grids.push(
      new Grid({
        src: "assets/space/invader.png",

        elementSize: 30,
        arrayHeight: 5,
        arrayLength: 5,

        velocity: {
          x: 5,
          y: 0,
        },

        scale: 1.5,
      })
    );
  }

  grids.forEach((grid, gridIndex) => {
    grid.elements.forEach((i, gI) => {
      projectiles.forEach((p, pI) => {
        if (
          p.position.y - p.radius <= i.position.y + i.height &&
          p.position.x + p.radius >= i.position.x &&
          p.position.x - p.radius <= i.position.x + i.width &&
          p.position.y + p.radius >= i.position.y
        ) {
          const invaderFound = grid.elements.find(invader2 => invader2 === i);
          const projectileFound = projectiles.find(
            projectile2 => projectile2 === p
          );

          //Remove
          if (invaderFound && projectileFound) {
            grid.elements.splice(gI, 1);
            projectiles.splice(pI, 1);

            if (grid.elements.length > 0) {
              //Take into consideration the new width
              const firstInvader = grid.elements[0];
              const lastInvader = grid.elements[grid.elements.length - 1];

              grid.width =
                lastInvader.position.x -
                firstInvader.position.x +
                lastInvader.width;

              grid.position.x = lastInvader.position.x;
            } else {
              grids.slice(gridIndex, 1);
            }
          }
        }
      });
    });
  });
});

addEventListener("keydown", ({ code }) => {
  if (code === "Space")
    projectiles.push(
      new Circle({
        position: {
          x: player.position.x + player.width / 2,
          y: player.position.y,
        },

        velocity: {
          x: 0,
          y: -25,
        },

        radius: 8,
        color: "red",
      })
    );
});

engine.Color("#000");
engine.Init();
