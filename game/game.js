function Game(canvas){
  //canvas and vancas context objects
  this.canvas = canvas;
  this.ctx = this.canvas.getContext('2d');

  //main player
  this.player = new Player(this.ctx, this.canvas.width/2, this.canvas.height/2);

  //blocks
  this.blocks = [];
  this.block_n = 6;

  //dictonary of key states, updated upon key press/release
  //by shelter.js via this.updateKeyStates()
  this.keyStates = {}


  //draw background and grid
  this.background = function(){
    this.ctx.fillStyle = BACK_CLR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    //draw dots every 30 px
    this.ctx.fillStyle = BLOCK_CLR;
    for(var h = 30; h < this.canvas.height; h += 30){
      for(var w = 30; w < this.canvas.width; w += 30){
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

  //set random course for block
  this.launchBlock = function(block){
      switch (Math.round(Math.random() * 3)){
        case 0:
          var randRow = Math.round(Math.random() * 20) * 30;
          block.setCourse([0, randRow],[570, randRow]);
          break;
        case 1:
          var randCol = Math.round(Math.random() * 20) * 30;
          block.setCourse([randCol, 0], [randCol, 570]);
          break;
        case 2:
          var randRow = Math.round(Math.random() * 20) * 30;
          block.setCourse([570, randRow],[0, randRow]);
          break;
        case 3:
          var randCol = Math.round(Math.random() * 20) * 30;
          block.setCourse([randCol, 570], [randCol, 0]);
          break;
      }
  }

  //look after blocks
  this.updateBlocks = function(){
    //remove any blocks that have reached their target
    for(var b = 0; b < this.blocks.length; b++){
      if(this.blocks[b].atTarget == true){
        this.blocks.splice(b, 1);
      }
    }

    //add new blocks, if required
    if(this.blocks.length < this.block_n){
      //create new block
      this.blocks.push(new Block(this.ctx, 0, 0));
      this.launchBlock(this.blocks[this.blocks.length - 1]);
    }
  }

  //handel player
  this.updatePlayer = function(){
    //print players health
    console.log(this.player.health);
    //move & draw player
    this.player.update(this.keyStates);

    //cheak if player touching any blocks, if so remove health point
    for(var b = 0; b < this.blocks.length; b++){
      if(this.player.x >= this.blocks[b].x
      && this.player.x <= this.blocks[b].x + 30
      && this.player.y >= this.blocks[b].y
      && this.player.y <= this.blocks[b].y + 30){
        this.player.health -= 1;
      }
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
  }

  //run once, upon page loading
  this.setup = function(){
    this.background();
    this.updateTimer = setInterval(this.update.bind(this), 10);
  }
}
