


function Game(canvas){
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.player = new Player(this.ctx, this.canvas.width/2, this.canvas.height/2);

  //draw background
  this.background = function(){
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  this.update = function(){
    this.background();
    this.player.update(keyStates);
  }


  this.begin = function(){
    this.background();
    setInterval(this.update(), 10);
  }
}
