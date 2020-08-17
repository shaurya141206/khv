var PLAY = 1;
var END = 0;
var gameState = PLAY;

var bird
var sky


var score=0;

var gameOver, restart;
var pipeImage,skyImage,GameoverImage,birdDieSound,ReplayImage

function preload(){
 
  pipeImage = loadImage("pipe.png");
  skyImage = loadImage("sky.gif");
  
 
  GameoverImg = loadImage("Gameover.png");
  ReplayImg = loadImage("Replay.png");
  
  
  birdDieSound = loadSound("birdDie.mp3");
  
}

function setup() {
  createCanvas(800, 800);
  
 
  sky = createSprite(200,180,400,20);
  sky.addImage("sky",skyImage);
  sky.y = sky.width /2;
  
  
  Gameover = createSprite(300,100);
  Gameover.addImage(GameoverImg);
  
 Replay = createSprite(300,140);
  Replay.addImage(ReplayImg);
  
  Gameover.scale = 0.5;
  Replay.scale = 0.5;

  Gameover.visible = false;
  Replay.visible = false;
  bird = createSprite(50,180,20,50);
  bird.scale = 0.5;
 
  
  
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  background(255);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    if (keyDown("space")){
      bird.velocityY = -10
    }
    
  
    
  
    bird.velocityX= bird.velocityX + 0.8
  
    if (sky.y < 0){
      sky.y = sky.width/2;
    }
  
    
    spawnObstacles();
    
    
  
    if(obstaclesGroup.isTouching(bird)){
      birdDieSound.play();  
      gameState = END;
        
    }
  }
  else if (gameState === END) {
    Gameover.visible = true;
    Replay.visible = true;
    
    //set velcity of each game object to 0
    
    bird.velocityY = 0;
    obstaclesGroup.setVelocityYEach(0);
    
    
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-2);
    
    
    if(mousePressedOver(Replay)) {
      Replay();
    }
  }
  
  
  drawSprites();
}


  


function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
   
     obstacle.addImage(pipeImage);
              
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.8;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  gameState = PLAY;
  
  Gameover.visible = false;
  Replay.visible = false;
  
  obstaclesGroup.destroyEach();
  
  
  
  score = 0;
  
}
