function Player(ctx, init_x, init_y){
  //canvas context object
  this.ctx = ctx;

  //image representing player
  this.img = new Image();
  this.img.src = 'player/player.png';

  //position, heading etc
  this.x = init_x;
  this.y = init_y;
  this.dx = 0;
  this.dy = 0;
  this.heading = 0;
  this.movement = 0;

  //resources
  this.resources = [];
  //walls
  this.walls = [];

  //specs of player
  this.specs = {
    'top-speed' : 3,
    'top-reverse-speed' : 2,
    'acceleration' : 0.4,
    'turn-speed' : 1,
    'health' : 5
  }

  //heath points
  this.health = this.specs['health'];
  this.dead = false;


  //prints various stats to console
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

  //move based on keys pressed
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
    //if moving very slowly, just stop
    if(Math.abs(this.movement) <= 0.02){
      this.movement = 0;
    }
    //else just slow down a bit
    else if(this.movement > 0.02){
      this.movement -= 0.03;
    }else if (this.movement < 0.02){
      this.movement += 0.03;
    }

    //convert heading, movement in to dx,dy
    this.dx = (this.movement * Math.sin(this.heading * DEG_TO_RAD));
    this.dy = -(this.movement * Math.cos(this.heading * DEG_TO_RAD));


    //apply dx,dy to x,y
    this.x += this.dx;
    this.y += this.dy;
  };

  //remove health points
  this.removeHealth = function(dhp){
    //if heath point delta is defined
    if(dhp != undefined){
      //remove specified health points
      this.health -= dhp;
    }
    //else remove all
    else {
      this.health = 0;
    }

    //change img for 600ms
    this.img.src = 'player/hurt_player.png';
    setTimeout(function(){this.img.src = 'player/player.png';}.bind(this), 600);

    this.displayHealth();
  }

  this.buildWall = function(){
    if(this.resources.length >= 5){
      for(var i = 0; i < 5; i++){
        this.resources.pop();
      }
      this.walls.push(new Wall(this.ctx, (this.x - (this.x % 30)),
        (this.y - (this.y % 30))));

      //increase health by 2
      this.health += 2;
    }
  }

  //draw image onto canvas based on position and heading
  this.draw = function(){
    for(var w = 0; w < this.walls.length; w++){
      this.walls[w].draw();
    }

    this.ctx.save();
    this.ctx.translate(this.x, this.y);
    this.ctx.rotate(this.heading * DEG_TO_RAD);
    this.ctx.drawImage(this.img, -3, -3);
    this.ctx.restore();
  };

  //draw representation of health level
  this.displayHealth = function(){
    this.ctx.save();
    this.ctx.translate(610, 0);
    this.ctx.fillStyle = BACK_CLR;
    this.ctx.fillRect(0, 0, 50, 300);
    this.ctx.fillStyle = HEALTH_DISPLAY_CLR;
    this.ctx.fillRect(0, 0, 50, this.health * 40);
    this.ctx.restore();
  }

  //draw representation of resources
  this.displayResources = function(){
    this.ctx.save();
    this.ctx.translate(610, 300);
    this.ctx.fillStyle = BACK_CLR;
    this.ctx.fillRect(0, 0, 50, 300);
    this.ctx.fillStyle = RESOURCE_DISPLAY_CLR;
    this.ctx.fillRect(0, (300 - (this.resources.length * 60)), 50,
      this.resources.length * 60);
    this.ctx.restore();
  }

  //update - move / draw / display
  this.update = function(keys){
    if(keys != undefined){
      this.move(keys);
      if(keys['f']){
        this.buildWall();
      }
    }
    this.draw();
    this.displayHealth();
    this.displayResources();
  };
}
