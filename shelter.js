//canvas object
var canvas;

//game object
var game;

//key-state store
keyStates = {
  'w' : false,
  's' : false,
  'a' : false,
  'd' : false,
  'f' : false
}

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
  game.updateKeyStates(keyStates);
}

function update(){
  game.update();
}

window.onload = function(){
  ///get canvas
  canvas = document.getElementById('mainCanvas');

  //setup event handlers for keyups and keydowns
  document.onkeyup = keyUp;
  document.onkeydown = keyDown;

  //create game, pass it canvas
  game = new Game(canvas);
  //setup game
  game.setup();

  window.setInterval(update, 50);
};
