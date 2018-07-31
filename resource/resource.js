
function Resource(ctx){
  this.ctx = ctx;

  this.img = new Image();
  this.img.src = 'resource/resource.png';

  this.x = Math.round(Math.random() * 19) * 30;
  this.y = Math.round(Math.random() * 19) * 30;

  //draw image onto canvas
  this.draw = function(){
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.drawImage(this.img, 0, 0);
    this.ctx.restore();
  };

}
