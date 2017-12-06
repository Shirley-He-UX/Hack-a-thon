var snow=[];
var snowNum=100;
var bubbles=[];
var tree=[];
var treeNum=12;

var img;
var deer;
var mic;
var santa;

function preload() {
  img = loadImage("assets/snowman.svg");
  deer = loadImage("assets/deer.svg");
  santa=loadImage("assets/santa.svg");
}
function setup() {
  mic = new p5.AudioIn()
  mic.start();
  
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textFont("Mr De Haviland");
  for(var i=0;i<snowNum;i++){
     snow[i] =new Snow(
                  random(width),
                  random(-height/2,height/2),
                  random(0,width/100),
                  random(-width/200,width/200),
                  random(height/400,height/220));
 }
  for(var i=0;i<treeNum;i++){
     tree[i] =new Tree(
                  random(0,width*12/20),
                  random(height/18),
                  random(-height/4,-height/20),
                  color(random(100,200),random(100,200),random(0,100)));
 }
 

}


function draw() {
  var bfrom = color(247,89,64);
  var bto = color(61,199,190);
  background(lerpColor(bfrom, bto,sin(frameCount/0.7)));
  
  image(img,-width*0.1,height-img.height/height*width*2.5,width*1.2,img.height/height*width*2.8);
  textSize(map(mic.getLevel(),0,1,width/7,width/2));
  
 
  push();
  translate(width/20,height*19/20)
  scale(1,map(mic.getLevel(),0,1,0.5,2));
  for(var i=0;i<tree.length;i++){
      tree[i].show();
  }
  pop();
  
  
  push();
  fill(255);
  translate(width/2,height/2);
  rotate(map(sin(frameCount/2),-1,1,-10,10));
  textAlign(CENTER);
  
  text("Merry Chrismas",0,-height/80);
  pop();
  for(var i=0;i<snow.length;i++){
      snow[i].move();
      snow[i].show();
  }
  image(santa,-map(mic.getLevel(),0,1,0,width/2)+width*11/20,map(sin(frameCount+240),-1,1,-height/100,height/100)+height/20,santa.width,santa.height);
  
  for(var i=0;i<4;i++){
    image(deer,-map(mic.getLevel(),0,1,0,width/2)+width/6*i,map(sin(frameCount+i*60),-1,1,-height/100,height/100)+height/10,deer.width/2,deer.height/2);
  }


  fill(0);
  
  ellipse(map(mouseX,0,width,width*16.6/20,width*17/20),map(mouseY,0,height,height-img.height/height*width*14/21,height-img.height/height*width*8/21),map(mic.getLevel(),0,1,width/120,width/100));
  ellipse(map(mouseX,0,width,width*17/20,width*17.4/20),map(mouseY,0,height,height-img.height/height*width*14/21,height-img.height/height*width*8/21),map(mic.getLevel(),0,1,width/120,width/100));


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}




function Tree(x,y,size,colors){
    this.x=x;
    this.y=y;
    this.size=size
    this.colors = colors;
    this.show=function(){
      fill(this.colors);
      noStroke();
      triangle(this.x,this.y, this.x+width/40,this.size+this.y,this.x+width/20, this.y);
      
    }
  }
    
    
function Snow(x,y,r,xs,ys){
    this.x=x;
    this.y=y;
    this.r=r;
    this.xspeed=xs;
    this.yspeed=ys;
    
    this.show =function(){
      fill(255,random(200,220));
      noStroke();
        ellipse(this.x,this.y,this.r);
    }
    this.move=function(){
        this.y+=this.yspeed;
        if(this.y>height){
            this.y=0;
        }  
    }
}

