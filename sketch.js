const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,box,ground;
var box_con;
var box_con_2;

var bg_img;
var block;
var rabbit;

var button,blower;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;
var boxArr=[],box_conArr=[];
var i=0;

function preload()
{
  bg_img = loadImage('./assets/const.jpg');
  block = loadImage('./assets/wood.jpg');
  bk_song = loadSound('./assets/sound1.mp3');
  cut_sound = loadSound('./assets/rope_cut.mp3');
}

function setup() {
  createCanvas(500,700);
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('./assets/cut_button.png');
  button.position(100,110);
  button.size(40,40);
  button.mouseClicked(drop);

  mute_btn = createImg('./assets/mute.png');
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  
  ground = new Ground(200,690,600,20);
  rope = new Rope(4,{x:130,y:110});
  
  box = Bodies.rectangle(300,300,40,40,{friction:2,frictionAir: 0.05,frictionStatic: 2});  
  boxArr.push(box)
  Matter.Composite.add(rope.body,boxArr[i]);
  
  box_con = new Link(rope,boxArr[i]);
  box_conArr.push(box_con)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bg_img,0,0,490,690);

  push();
  imageMode(CENTER);
  for(var x=0;x<=i;x++){
    image(block,boxArr[x].position.x,boxArr[x].position.y,40,40);
  }
  pop();

  rope.show();
  Engine.update(engine);
  ground.show();  

  
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  box_conArr[i].detach();
 
  //box_con = null; 
  i=i+1;

  rope = new Rope(4,{x:130,y:110});
  
  boxArr[i] = Bodies.rectangle(300,300,40,40,{friction:2,frictionAir: 0.05,frictionStatic: 2});  
  //boxArr.push(box)
  console.log(boxArr[i])
  Matter.Composite.add(rope.body,boxArr[i]);
  
  box_con = new Link(rope,boxArr[i]);
  box_conArr.push(box_con)
}





function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}


