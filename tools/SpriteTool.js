import Engine, { c } from "../core/Engine.js";
import GameObject from "../core/objects/GameObject.js";

const engine = new Engine(500, 500);

//Dom
const exportBtn = document.querySelector(".export");
const loadSpriteButton = document.querySelector(".loadSprite");
const fileInput = document.querySelector("#fileInput");
const scale = document.querySelector("#scale");
const frames = document.querySelector("#frames");
const framesHold = document.querySelector("#framesHold");
let sprite;

const offsetX = document.querySelector("#offsetX");
const offsetY = document.querySelector("#offsetY");

const hitboxW = document.querySelector("#hitboxW");
const hitboxH = document.querySelector("#hitboxH");

let finalWidth = hitboxW.value;
let finalHeight = hitboxH.value;
let hitboxCode = `width: ${finalWidth}, 
        height: ${finalHeight}`;

let scaleCode = `scale: ${scale.value}`;
let framesCode = `frames: ${frames.value}`;
let framesHoldCode = `frameHold: ${framesHold.value}`;

let finalOffsetX = offsetX.value;
let finalOffsetY = offsetY.value;
let offsetCode = `offset: {x: ${finalOffsetX}, y: ${finalOffsetY}}`;

let code = `
    const player = new GameObject({
        position: {
            x: 0,
            y: 0 
        },

        ${scaleCode},
        ${framesCode},
        ${framesHoldCode},
        ${hitboxCode},
        
        src: 'src' //MAKE THIS THE ACTUAL PATH TO THE IMAGE
    });

    engine.RenderGameObject(player);
`;

engine.AddLoopCode(() => {
  c.fillStyle = "rgba(255, 0, 0, 0.5)";
  c.fillRect(0, 0, finalWidth, finalHeight);
});

loadSpriteButton.onclick = () => {
  fileInput.click();
};

fileInput.onchange = () => {
  const files = fileInput.files;

  // FileReader support
  if (FileReader && files && files.length) {
    const fr = new FileReader();
    fr.onload = () => {
      sprite = new GameObject({
        position: { x: 0, y: 0 },
        src: fr.result,
        offset: {
          x: finalOffsetX,
          y: finalOffsetY,
        },

        width: hitboxW.value,
        height: hitboxH.value,
      });

      engine.RenderGameObject(sprite);
    };

    fr.readAsDataURL(files[0]);
  }
};

//Update
scale.onchange = () => {
  sprite.scale = scale.value;

  scaleCode = `scale: ${sprite.scale}`;

  UpdateMainCode();
};

frames.onchange = () => {
  sprite.frames = frames.value;

  framesCode = `frames: ${sprite.frames}`;

  UpdateMainCode();
};

framesHold.onchange = () => {
  sprite.frameHold = framesHold.value;

  framesHoldCode = `frameHold: ${sprite.frameHold}`;

  UpdateMainCode();
};

offsetX.onchange = () => {
  finalOffsetX = offsetX.value;
  sprite.offset.x = finalOffsetX;

  offsetCode = `offset: {x: ${finalOffsetX}, y: ${finalOffsetY}}`;

  UpdateMainCode();
};

offsetY.onchange = () => {
  finalOffsetY = offsetY.value;
  sprite.offset.y = finalOffsetY;

  offsetCode = `offset: {x: ${finalOffsetX}, y: ${finalOffsetY}}`;

  UpdateMainCode();
};

hitboxW.onchange = () => {
  finalWidth = hitboxW.value;
  sprite.width = finalWidth;

  hitboxCode = `width: ${finalWidth}, 
  height: ${finalHeight}`;

  UpdateMainCode();
};

hitboxH.onchange = () => {
  finalHeight = hitboxH.value;
  sprite.height = finalHeight;

  hitboxCode = `width: ${finalWidth}, 
    height: ${finalHeight}`;

  UpdateMainCode();
};

function UpdateMainCode() {
  code = `
    const player = new GameObject({
        position: {
            x: 0,
            y: 0 
        },
        
        ${scaleCode},
        ${framesCode},
        ${framesHoldCode},
        ${offsetCode},
        ${hitboxCode},
        
        src: '' //PUT THE SOURCE IN HERE
    });
    
    engine.RenderGameObject(player);
`;
}

exportBtn.onclick = () => {
  const link = document.createElement("a");
  const file = new Blob([code], { type: "text/plain" });

  // Add file content in the object URL
  link.href = URL.createObjectURL(file);

  // Add file name
  link.download = "gameObject.txt";

  // Add click event to <a> tag to save file.
  link.click();
  URL.revokeObjectURL(link.href);
};

engine.Init();
