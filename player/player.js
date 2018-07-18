

function Player(init_x, init_y){
  this.x = init_x;
  this.y = init_y;
  this.dx = 0;
  this.dy = 0;
  this.health = 10;
  this.specs = {
    
  }
  this.move(input){

  }

  this.draw = function(){

  };
  this.update = function(keys){
    if(keys != undefined){
      this.move(keys);
    }
    this.draw();
  };







}
