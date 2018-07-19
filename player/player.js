var DEG_TO_RAD = (Math.PI / 180);

function Player(init_x, init_y){
  this.img = new Image();
  this.img.src = 'player/player.png';

  this.x = init_x;
  this.y = init_y;
  this.dx = 0;
  this.dy = 0;

  this.heading = 0;
  this.movement = 0;

  this.specs = {
    'top-speed' : 1,
    'acceleration' : 1,
    'turn-speed' : 1,
    'health' : 10
  }

  this.health = this.specs['health'];

  this.log = function(){
    var logStr = '';
    logStr += 'X :';
    logStr += Math.round(this.x);
    logStr += ' Y :';
    logStr += Math.round(this.y);
    logStr += ' Movement :'
    logStr += this.movement;
    console.log(logStr);
  }

  this.move = function(input){
    //convert keys to heading, movement
    if(input['w'] == true){
      this.movement += 0.1;
    }
    if(input['s'] == true){
      this.movement -= 0.1;
    }
    if(input['a'] == true){
      this.heading -= Math.abs(this.movement + 1);
    }
    if(input['d'] == true){
      this.heading += Math.abs(this.movement + 1);
    }

    //apply friction
    if(Math.abs(this.movement) <= 0.09){
      this.movement = 0;
    }else if(this.movement > 0.09){
      this.movement -= 0.05;
    }else if (this.movement < 0.09){
      this.movement += 0.05;
    }

    //convert heading, movement to dx,dy
    this.dx = (this.movement * Math.sin(this.heading * DEG_TO_RAD));
    this.dy = -(this.movement * Math.cos(this.heading * DEG_TO_RAD));


    //apply dx,dy to x,y
    this.x += this.dx;
    this.y += this.dy;
  };

  this.draw = function(){
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.heading * DEG_TO_RAD);
    ctx.drawImage(this.img, -3, -3);
    ctx.restore();
  };




  this.update = function(keys){
    if(keys != undefined){
      this.move(keys);
    }
    this.draw();
    //this.log();
  };
}