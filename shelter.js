
//canvas and canvas context objects
var canvas;
var ctx;
var width, height;

//timer variable
var t;

//key-state store
keyStates = {
  'w' : false,
  's' : false,
  'a' : false,
  'd' : false,
  'f' : false
}

//main player
var mainPlayer;

//keyup and keydown handlers
function keyUp(e){
  changeKey(e.key, false);
}
function keyDown(e){
  changeKey(e.key, true);
}

function changeKey(key, state){
  switch (key){
    case 'w':
      keyStates['w'] = state;
      break;
    case 's':
      keyStates['s'] = state;
      break;
    case 'a':
      keyStates['a'] = state;
      break;
    case 'd':
      keyStates['d'] = state;
      break;
    case 'f':
      keyStates['f'] = state;
      break;
    default:
      break;
  }
}

//draw background
function background(){
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

function update(){
  background();
  mainPlayer.update(keyStates);
}

function setup(){
  background();
  mainPlayer = new Player(width/2, height/2);
}

window.onload = function(){
  ///get canvas, canvas width and height
  canvas = document.getElementById('mainCanvas');
  width = canvas.width;
  height = canvas.height;

  //get canvas context
  ctx = canvas.getContext('2d');

  //setup event handlers for keyups and keydowns
  document.onkeyup = keyUp;
  document.onkeydown = keyDown;

  //setup
  setup();
  t = setInterval(update, 10);
};
