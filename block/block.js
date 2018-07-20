
function Block(ctx, init_x, init_y){
  this.ctx = ctx;

  this.step = [0,0];
  this.target = [];

  this.x = init_x;
  this.y = init_y;

  //draw block_clr'ed square on canvas at x, y
  this.draw = function(){
    this.ctx.fillStyle = BLOCK_CLR;
    this.ctx.fillRect(this.x, this.y, 30, 30);
  }

  //move towards target
  this.move = function(dx, dy){
    //move one step
    this.x += (this.step[0] * 30);
    this.y += (this.step[1] * 30);

    //cheak if reached target, if so adjust step
    if(this.x == this.target[0]){
      this.step[0] = 0;
    }

    if(this.y == this.target[1]){
      this.step[1] = 0;
    }

    //finally draw block
    this.draw()
  }

  //set course
  this.setCourse = function(start, end){
    //move to start
    this.x = start[0];
    this.y = start[1];

    //record target
    this.target = end;

    //formulate step
    //(if target to left set step to [-1, 0] ie. move one left, zero down)

    if(this.target[0] > this.x){
      this.step[0] = 1;
    }else if(this.target[0] < this.x){
      this.step[0] = -1;
    }

    if(this.target[1] > this.y){
      this.step[1] = 1;
    }else if (this.target[1] < this.y){
      this.step[1] = -1;
    }
  }

}