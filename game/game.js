




function Game(canvas){
  //canvas and vancas context objects
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  //player object
  this.player = new Player(this.ctx, this.canvas.width/2, this.canvas.height/2);

  //dictonary of key states, updated upon key press/release
  //by shelter.js via this.updateKeyStates()
  this.keyStates = {}


  //draw background
  this.background = function(){
    this.ctx.fillStyle = BACK_CLR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.fillStyle = BLOCK_CLR;
    for(var h = 30; h < this.canvas.height; h += 30){
      for(var w = 30; w < this.canvas.width; w += 30){
        this.ctx.beginPath();
        this.ctx.ellipse(w, h, 1, 1, 0, 0, (Math.PI * 2));
        this.ctx.fill();
      }
    }
  }

  //run by shelter.js, upon keyState changes
  this.updateKeyStates = function(newKeyStates){
    this.keyStates = newKeyStates;
  }

  //run by a setInterval
  this.update = function(timer){
    this.background();
    this.player.update(this.keyStates);
    if(timer % 90 == 0){
      this.testBlock.move();
    }

  }

  //run once, upon page loading
  this.setup = function(){
    this.background();
    this.testBlock = new Block(this.ctx, 30, 30);
  }
}
