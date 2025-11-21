// R. Gorr-Grohmann
// September 2025
// Drawing colored snail slime pathes
//
"use strict";
let hlp;
let graphics;
let tst;
let json;
let data;
let fileInOut;
let canvas;
let eventHandler;
let dialogMain;
let dialogModus;
let dialogConf;
let dialogPause;
let dialogRun;
let drawSnails;
let stateRunning = false;
//
// Config global parameters
let centralvector;
let cyclesPerRect = 25;
let cyclesPerRectangle;
let cntPartPoints = 25;
let drawTempo = 1 / cntPartPoints;
let meanDrawingTime = 30; // Seconds
let createClip = false;
let clipDraw = true;
//
function setup() {
  hlp = new Help();
  tst = new Test("main", true, 1);
  graphics = new Graphics();
  json = new JSONObject();
  data = new Data();
  data.format.setValue(4);
  tst.off();
  frameRate(data.frames.getValue());
  colorMode(RGB, 255);
  data.bgcolor.setValueRandomly();
  data.linecolor.setValueRandomly();
  // Canvas
  canvas = createCanvas(
    data.format.getWidth(), 
    data.format.getHeight());
  background(data.bgcolor.getValue());
  // Dialog
  dialogMain = new DialogMain();
  //dialogConf = new DialogConf();
}
//
function draw() {
  if (stateRunning) {
    dialogRun.auto.eveCall(0, 0, 0);
  } else {
    dialogMain.auto.eveCall(0, 0, 0);
  }
  clipDraw = clipDraw ? false : true;
}
