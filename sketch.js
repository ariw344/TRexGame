var trex, trex_running;
var cloudsGroup, cloudImage;
var groundImage;
var cloud;
var ob1, ob2, ob3, ob4, ob5, ob6;
var gameState = "play";
var gameOver, restart, gameOverImage, restartImage;
function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
  collided = loadImage("trex_collided.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -8;
  
  gameOver = createSprite(300, 100, 400, 100);
  gameOver.addImage("gameOver", gameOverImage);
  gameOver.visible = false;

  restart = createSprite(300, 150, 40, 40);
  restart.addImage("restart", restartImage);
  restart.visible = false;
  restart.scale = 0.5;

  obstacleGroup = new Group();
  cloudsGroup = new Group();
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
   
}

function draw() {
  background(255, 127, 127);
  if (gameState === "play") {
    if(keyDown("space") && trex.y >= 160) {
      trex.velocityY = -13;
    }
    
    
    if (ground.x < 0) {
      ground.x = ground.width/2;
    }
    
    
    if (frameCount % 60 === 0) {
      createCloud();
    }
    if (frameCount % 80 === 0) {
      createObstacle();
    }
    if (obstacleGroup.isTouching(trex)) {
      trex.changeImage("collided", collided)
      cloudsGroup.setVelocityXEach(0);
      obstacleGroup.setVelocityXEach(0);
      ground.velocityX = 0;
      gameState = "end";
    }
  }
  if (gameState === "end") {
    gameOver.visible = true;
    restart.visible = true;
    if (mousePressedOver(restart)) {
      cloudsGroup.destroyEach();
      obstacleGroup.destroyEach();
      gameOver.visible = false;
      restart.visible = false;
      ground.velocityX = -8;
      gameState = "play";
    }
  }
  drawSprites();
  trex.velocityY = trex.velocityY + 0.8
  trex.collide(invisibleGround);
}

function createCloud() {
  cloud = createSprite(600, random(75, 125), 50, 20);
  cloud.addImage("cloud", cloudImage);
  cloud.scale = 0.5;
  cloud.velocityX = -8;
  cloudsGroup.add(cloud);
}

function createObstacle() {
  obstacle = createSprite(600, 160, 20, 40);
  var randomOb = Math.round(random(1, 6));
  switch (randomOb) {
    case 1: obstacle.addImage("obstacle", ob1);
    break;
    case 2: obstacle.addImage("obstacle", ob2);
    break;
    case 3: obstacle.addImage("obstacle", ob3);
    break;
    case 4: obstacle.addImage("obstacle", ob4);
    break;
    case 5: obstacle.addImage("obstacle", ob5);
    break;
    case 6: obstacle.addImage("obstacle", ob6);
    break;
    default: break;
  }
  obstacle.velocityX = -8;
  obstacle.scale = 0.6;
  obstacleGroup.add(obstacle);
}
