var bird, birdImage;
var  bg, bgImage;
var pillar, pillarImage;
var gameState = "PLAY";
var score = 0;
var survivalTime = 0;
var survivaldisplay = 0;
var x1 = 0;
var x2; 
var scrollSpeed = 2;
var foodImage;
var eagleImage;

function preload(){
  birdImage = loadImage("bird.png");
  bgImage = loadImage("background.jpg");
  pillarImage = loadImage("pillar.png"); 
  foodImage = loadImage("food.png");
  eagleImage = loadImage("eagle.png"); 
}

function setup(){
  createCanvas(1000, 600);
  x2 = width;

//  bg = createSprite(500, 300, 1000, 600);
//  bg.addImage(bgImage);
//  bg.scale = 2;
//  bg.velocityX = -5;
  bird = createSprite(50, 300, 10, 10);
  bird.addImage(birdImage);
  bird.scale = 0.2;
  bird.setCollider("circle", 0, 0, 150);
  obstacleGroup = new Group();
  foodGroup = new Group();
  eagleGroup = new Group();  
}

function draw(){
  background(0);
  image(bgImage, x1, 0, width, height);
   image(bgImage, x2, 0, width, height);
    x1 -= scrollSpeed;
    x2 -= scrollSpeed;
   if (x1 < -width){
      x1 = width;
   }
   if (x2 < -width){ 
     x2 = width;
   }
  
  drawSprites();
  console.log(gameState);
  console.log("bird.y", bird.y);
  bird.debug = true;
  textSize(20);
  fill("black");
  text("Survival Time : " + survivaldisplay, 800, 100);
  text("Score : " + score, 100, 100);
  if( gameState === "PLAY"){
    survivalTime = survivalTime + 0.1;
    survivaldisplay = Math.round(survivalTime);
    if(survivaldisplay % 100 === 0 && survivaldisplay > 0){
      scrollSpeed = scrollSpeed + 1;
    }
    if(keyDown("UP_ARROW")){
      bird.velocityY = -5;
  }
  bird.velocityY = bird.velocityY + 0.5; 
//  if(bg.x < 0){
//      bg.x = 3*bg.width/2;
//  }

   if(bird.isTouching(foodGroup)){
     foodGroup.destroyEach();
     score = score + 1;
   }
  if(score > 2){
    spawnEagle();
      if(bird.isTouching(eagleGroup)){
        gameState = "END";
      }
  }

  if(bird.isTouching(obstacleGroup)|| bird.y > 700){
    gameState = "END";
  }
  spawnObstacles();
  spawnFood();
  }else if(gameState === "END"){
    bird.velocityY = 0;
    scrollSpeed = 0;
//   bg.velocityX = 0;
    obstacleGroup.setVelocityXEach (0);
    obstacleGroup.destroyEach();
    textSize(50);
    fill("black");    
    text("GAME OVER", 400, 300);
    eagleGroup.setVelocityXEach(0);
    eagleGroup.destroyEach();
  }
}

function spawnObstacles(){
   if(frameCount % 200 === 0){
    var obstacle = createSprite(1000, 100, 10, 10);
    obstacle.addImage(pillarImage);
    obstacle.velocityX = -5;
    obstacle.scale = 0.5;
    obstacle.setCollider("rectangle", 0, 0, obstacle.width - 300, obstacle.height);
    var obstacle2 = createSprite(1000, 100, 10, 10);
    obstacle2.addImage(pillarImage);
    obstacle2.velocityX = -5;
    obstacle2.scale = 0.5;
    obstacle.debug = true;
    obstacle2.debug = true;
    obstacle2.setCollider("rectangle", 0, 0, obstacle2.width - 300, obstacle2.height);
  var position = Math.round(random(1, 2));
      switch(position){
        case 1: obstacle.y = 100;
        obstacle2.y = 500;
        break;
        case 2: obstacle.y = 500;
        obstacle2.y = 100
        break;
        default: break;
      }
      var size = Math.round(random(1, 5));
      switch(size){
        case 1: obstacle.scale = 0.15;
        obstacle2.scale = 0.15;
        break;
        case 2: obstacle.scale = 0.25;
        obstacle2.scale = 0.25;
        break;
        case 3: obstacle.scale = 0.35;
        obstacle2.scale = 0.35;
        break;
        case 4: obstacle.scale = 0.45;
        obstacle2.scale = 0.45;
        break;
        case 5: obstacle.scale = 0.55;
        obstacle2.scale = 0.55;
        break;
        default: break;
      }
      obstacle.lifetime = 250;
      obstacle2.lifetime = 250;
      obstacleGroup.add(obstacle);
      obstacleGroup.add(obstacle2);
   }
   
   
}
function spawnFood(){
  if(frameCount % 280 === 0){
    var food = createSprite(1000, 50);
    food.addImage(foodImage);
    food.y = Math.round(random(100, 500));
    food.velocityX = -5;
    food.scale = 0.1;
    foodGroup.add(food);
    food.lifetime = 250;
  }
}

function spawnEagle(){
  if(frameCount % 280 === 0){
    var eagle = createSprite(1000, 50);
    eagle.addImage(eagleImage);
    eagle.y = Math.round(random(100, 500));
    eagle.velocityX = -9;
    eagle.scale = 1;
    eagleGroup.add(eagle);
    eagle.lifetime = 250;
  }   
}