var DEG_TO_RAD = (Math.PI / 180);

function Player(ctx, init_x, init_y){
  this.ctx = ctx;

  this.img = new Image();
  this.img.src = 'player/player.png';

  this.x = init_x;
  this.y = init_y;
  this.dx = 0;
  this.dy = 0;

  this.heading = 0;
  this.movement = 0;

  this.specs = {
    'top-speed' : 3,
    'top-reverse-speed' : 2,
    'acceleration' : 0.4,
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

    if(this.movement < this.specs['top-speed']){
      if(input['w'] == true){
        this.movement += (0.1 * this.specs['acceleration']);
      }
    }

    if(this.movement > -this.specs['top-reverse-speed']){
      if(input['s'] == true){
        this.movement -= (0.09 * this.specs['acceleration']);
      }
    }

    if(input['a'] == true){
      this.heading -= (Math.abs(this.movement + 1) * this.specs['turn-speed']);
    }
    if(input['d'] == true){
      this.heading += (Math.abs(this.movement + 1) * this.specs['turn-speed']);
    }

    //apply friction
    if(Math.abs(this.movement) <= 0.02){
      this.movement = 0;
    }else if(this.movement > 0.02){
      this.movement -= 0.03;
    }else if (this.movement < 0.02){
      this.movement += 0.03;
    }

    //convert heading, movement to dx,dy
    this.dx = (this.movement * Math.sin(this.heading * DEG_TO_RAD));
    this.dy = -(this.movement * Math.cos(this.heading * DEG_TO_RAD));


    //apply dx,dy to x,y
    this.x += this.dx;
    this.y += this.dy;
  };

  this.draw = function(){
    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.heading * DEG_TO_RAD);
    this.ctx.drawImage(this.img, -3, -3);
    this.ctx.restore();
  };


  this.update = function(keys){
    if(keys != undefined){
      this.move(keys);
    }
    this.draw();
    //this.log();
  };
}
