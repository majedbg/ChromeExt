//const contents = document.getElementById('contents');
//const water = document.createElement('water');
const pageBody = document.querySelector('body');
//contents.parentNode.removeChild(contents);
//pageBody.appendChild(water);
console.log("running main js");


let help = document.querySelectorAll('a[href]')
help.forEach(el => el.addEventListener("mouseover", () => {
el.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive'
el.style.color=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`}))

help.forEach(el =>el.addEventListener("mouseover", ()=>new food(mouseX,mouseY)))


class food{
    constructor(x,y){
        this.node = document.createElement('food')
        this.x = x
        this.y = y
        this.node.style.top = `${y}px`
        this.node.style.left = `${x}px`
        this.node.style.backgroundColor= `rgb(${Math.random()*155 +100},${Math.random()*155 +100 },${Math.random()*155+100})`
        pageBody.appendChild(this.node)

        this.boundDrop = this.drop.bind(this)
        setTimeout(this.boundDrop,125)
    }
    
    drop(){
        let y = Number(this.node.style.top.replace("px",''))
        let x = Number(this.node.style.left.replace("px",''))
        this.node.style.top = `${y+15}px`
        this.node.style.left = `${x+(25-(Math.random()*50))}px`
        setTimeout(this.boundDrop,125)
    }
}
function preload() {
  let beeImg;
  let flowerImg;
}

function setup() {
  let c = createCanvas(windowWidth,windowHeight);
  // let oldX = 0;
  c.position(0, 0, 'fixed');
  c.style('pointer-events','none');
    beeVelocityX = 0;
    beeX = 0;
    newBeeX = 0;
  //clear();
  beeImgRight = loadImage('https://freight.cargo.site/t/original/i/d46cc91e48359a7c329ad4ff4842a2efea7a7244bda89a9807cdd79d01cd4bba/BeeRight.png');
  beeImgLeft = loadImage('https://freight.cargo.site/t/original/i/e4e97d79863a2f5fa68db43d2e4e525cb317437fe91d6ed0b125c20ab9ad7b55/BeeLeft.png')
  flowerImg = loadImage('https://freight.cargo.site/t/original/i/e0632307ee83ce275029d81f7990a4fd0debb16d9d6528e90ac0f6c05879d77e/Flower.png');
  }
  
  function draw() {
    circle(300,300,100);
  clear();
  resizeCanvas(windowWidth, windowHeight);
    background(123, 211, 255, 0);
    fill(230, 150, 200, 100);
    //rect(0,windowHeight*0.65,windowWidth,windowHeight);
  //line(mouseX,mouseY,mouseX,windowHeight);
  //circle(mouseX,mouseY,30);
  image(flowerImg,mouseX-25,mouseY-25,60,60);
  

  beeVelocityX= (mouseX-beeX)/30;
  newBeeX = beeX + beeVelocityX;
  //circle(newBeeX,windowHeight*0.9,50);
  //displays bee direction based on velocity
  if (beeVelocityX < 0 ) {
    image(beeImgLeft, newBeeX-50, windowHeight*0.85,80,80);
  } else {
    image(beeImgRight, newBeeX-50, windowHeight*0.85,80,80);
  }
  beeX = newBeeX;
  // circle(oldX+mouseX, windowHeight*0.8,80);
  // oldX = (oldX+mouseX)/2;
    
 
  }