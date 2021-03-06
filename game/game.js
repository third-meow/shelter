function Game(canvas){
  //canvas and vancas context objects
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');
  this.width = this.canvas.width - 60;
  this.height = this.canvas.height;

  //main player
  this.player = new Player(this.ctx, this.width/2, this.height/2);

  //resources
  this.resources = []
  this.max_resource_n = 2;

  //blocks
  this.blocks = [];
  this.max_block_n = 2;

  //dictonary of key states, updated upon key press/release
  //by shelter.js via this.updateKeyStates()
  this.keyStates = {}


  //draw background and grid
  this.background = function(){
    this.ctx.fillStyle = BACK_CLR;
    this.ctx.fillRect(0, 0, this.width, this.height);
    //draw dots every 30 px
    this.ctx.fillStyle = BLOCK_CLR;
    for(var h = 30; h < this.height; h += 30){
      for(var w = 30; w < this.width; w += 30){
        this.ctx.beginPath();
        this.ctx.ellipse(w, h, 1, 1, 0, 0, (Math.PI * 2));
        this.ctx.fill();
      }
    }
  }

  //updates keyStates dictionary
  this.updateKeyStates = function(newKeyStates){
    this.keyStates = newKeyStates;
  }

  //look after blocks
  this.updateBlocks = function(){
    //remove any blocks that have reached their target or are touching a wall
    for(var b = 0; b < this.blocks.length; b++){
      for(var w = 0; w < this.player.walls.length; w++){
        if(this.player.walls[w].x == this.blocks[b].x
          &&this.player.walls[w].y == this.blocks[b].y){
            this.blocks[b].atTarget = true;
            break;
          }
      }

      if(this.blocks[b].atTarget == true){
        clearInterval(this.blocks[b].drawTimer);
        clearInterval(this.blocks[b].updateTimer);
        this.blocks.splice(b, 1);
      }
    }

    //add new blocks, if required
    if(this.blocks.length < this.max_block_n){
      //create new block
      this.blocks.push(new Block(this.ctx, 0, 0));
      this.blocks[this.blocks.length - 1].launch();
    }
  }

  //handle resources
  this.updateResources = function(){
    if(this.resources.length < this.max_resource_n){
      if(Math.random() >= 0.995){
        this.resources.push(new Resource(this.ctx))
      }
    }

    for(var r = 0; r < this.resources.length; r++){
      this.resources[r].draw();
    }
  }

  //handle player
  this.updatePlayer = function(){
    //move & draw player
    this.player.update(this.keyStates);


    //check if player touching any blocks, if so remove health point
    //and delete block
    for(var b = 0; b < this.blocks.length; b++){
      if(this.player.x >= this.blocks[b].x
      && this.player.x <= this.blocks[b].x + 30
      && this.player.y >= this.blocks[b].y
      && this.player.y <= this.blocks[b].y + 30){
        this.blocks.splice(b, 1);
        this.player.removeHealth(1);
      }
    }

    //check if player touching any resources, if so give to player
    for(var r = 0; r < this.resources.length; r++){
      if(this.player.x >= this.resources[r].x
      && this.player.x <= this.resources[r].x + 30
      && this.player.y >= this.resources[r].y
      && this.player.y <= this.resources[r].y + 30){
        //if player has less than 5 resources already
        if(this.player.resources.length < 5){
          //give resource to player
          this.player.resources.push(this.resources.splice(r, 1)[0]);
        }
      }
    }
    //if player touching edge, player is dead
    if(this.player.x <= 0 || this.player.x >= 600
      || this.player.y <= 0 || this.player.y >= 600){
        this.player.removeHealth();
      }

    //if dead..
    if(this.player.health <= 0){
      alert("You're Dead");
      clearInterval(this.updateTimer);
    }
  }

  //run by a setInterval
  this.update = function(){
    this.background();
    this.updatePlayer();
    this.updateBlocks();
    this.updateResources();
  }

  //run once, upon page loading
  this.setup = function(){
    this.background();
    this.updateTimer = setInterval(this.update.bind(this), 10);
  }
}
