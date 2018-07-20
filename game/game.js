function Game(canvas){
  //canvas and vancas context objects
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  //player object
  this.player = new Player(this.ctx, this.canvas.width/2, this.canvas.height/2);

  //dictonary of key states, updated upon key press/release
  //by shelter.js via this.updateKeyStates
  this.keyStates = {}


  //draw background
  this.background = function(){
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  //run by shelter.js, upon keyState changes
  this.updateKeyStates = function(newKeyStates){
    this.keyStates = newKeyStates;
  }

  //run by a setInterval
  this.update = function(){
    this.background();
    this.player.update(this.keyStates);
  }

  //run once, upon page loading
  this.setup = function(){
    this.background();
  }
}
