
function Wall(ctx, x, y){
  this.ctx = ctx;

  this.x = x;
  this.y = y;
  this.health = 10;

  this.draw = function(){
    this.ctx.fillStyle = WALL_CLR;
    this.ctx.fillRect(this.x, this.y, 30, 30);
  }
}
