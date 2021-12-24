var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie, zombieImg, zombiey, zombiepos;
var rand;
var ball, ballImg;
var zombieGroup, ballGroup;
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")

  zombieImg = loadImage("assets/zombie.png")

  ballImg = loadImage("assets/cannonball.png")

  hand = loadImage("assets/hand.png")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  zombieGroup = new Group();
  ballGroup = new Group();

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false
   player.setCollider("rectangle",0,0,300,300)
}

function draw() {
  background(0); 




  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}

for (var a = 0; a < ballGroup.length; a++) {
  collisionWithzombie(a);
}



//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
 shoot()
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}

displayzombie();

drawSprites();

}
function displayzombie(){
  if(frameCount%100===0){
    zombie = createSprite(1500,100,70,70)
    zombie.addImage(zombieImg)
    zombie.scale = 0.18
    zombie.y = Math.round(random(50,800))
    zombie.velocityX = -5;
    zombie.setCollider("rectangle",0,0,300,300)
    zombie.debug = true;
    zombieGroup.add(zombie);
  }
  
}

function shoot(){
  ball = createSprite(player.x, player.y, 50, 50);
  ball.addImage(ballImg);
  ball.scale = 0.05;
  ball.velocityX = 10;
  ballGroup.add(ball);
}

function collisionWithzombie(index){
  var b = index;
  for (var i = 0; i < zombieGroup.length; i++){
    if(i.isTouching(b)){
      zombie.changeAnimation(hand);
    }
  }
}