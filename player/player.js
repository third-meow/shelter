const var DEG_TO_RAD (Math.PI / 180);

function Player(init_x, init_y){
  this.img = new Image();
  this.img.src = 'player.png';

  this.x = init_x;
  this.y = init_y;
  this.dx = 0;
  this.dy = 0;

  this.heading = 0;
  this.dHeading = 0;
  this.movement = 0;

  this.specs = {
    'speed' : 10,
    'turn-speed' : 10,
    'health' : 10
  }

  this.health = this.specs['health'];


  this.move(input){
    //convert keys to dHeading, movement
    if(input['w']){
      this.movement += 1;
    }
    if(input['s']){
      this.movement -= 1;
    }
    if(input['a']){
      this.dHeading -= 1;
    }
    if(input['d']){
      this.dHeading += 1;
    }

    //apply dHeading to heading
    this.heading += this.dHeading;

    //convert heading, movement to dx,dy
    this.dx += (dis * Math.sin(this.heading * DEG_TO_RAD));
    this.dy += (dis * Math.cos(this.heading * DEG_TO_RAD));

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
  };
}
