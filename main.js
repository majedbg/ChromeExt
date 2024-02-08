const pageBody = document.querySelector('body');

//link selector (stored in var 'help')
let help = document.querySelectorAll('a[href]')
//invoking function on each individual link object on mouse hover...
help.forEach(el => el.addEventListener("mouseover", () => {
//change font..
el.style.fontFamily = 'Comic Sans MS, Comic Sans, cursive'
//and set color to  a random color
el.style.color=`rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
//create new instance of pollen on the mouse location
new food(mouseX,mouseY)
    }
  )
)
//adding another
//help.forEach(el =>el.addEventListener("mouseover", ()=>new food(mouseX,mouseY)))

const eatingPollen = function(beeX,beeY) {
  //console.log(`bee X: ${beeX} and bee Y: ${beeY}`);
  const allPollen = document.querySelectorAll('food');
  allPollen.forEach( (pollen) => { //loop through all pollen boxes
    const pollenX = Number(pollen.style.left.replace("px",''));
    const pollenY = Number(pollen.style.top.replace("px",''));
    if ( pollenX > beeX-50 && pollenX < beeX+15 ) { //if the X-axis position of the pollen overlaps with the bee
      if ( pollenY < beeY+40 && pollenY > beeY-20) { //and Y-axis of pollen overlaps with bee..
        pollen.remove(); //remove pollen DOM element
        //extension: display image of bee eating pollen
        //extension: increment pollen eating counter?
        //extension: when a bee eats pollen, it saves the link into a list for user to visit later.
        //extension: make the list visible in a window so people can see bookmarks
      }
    }
  })
}

//pollen!
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
        let y = Number(this.node.style.top.replace("px",''));
        let x = Number(this.node.style.left.replace("px",''));
        let newX = this.node.style.top = `${y+15}px`;
        let newY = this.node.style.left = `${x+(25-(Math.random()*50))}px`;
        //if pollen falls outside the screen.. delete it (so it doesn't clutter DOM space)
        if (y > windowHeight) { this.node.remove(); return };
        eatingPollen(beeX,beeY);
        setTimeout(this.boundDrop,125);
    }
}
function preload() {
  let beeImg;
  let flowerImg;
}

function setup() {
  let c = createCanvas(windowWidth,windowHeight);
  c.style('z-index','100');
  // let oldX = 0;
  c.position(0, 0, 'fixed');
  c.style('pointer-events','none');
    beeVelocityX = 0;
    beeX = 0;
    newBeeX = 0;

    gravity = 2;
    floatSpeed = 4;
    jumpHeight = 30;

    beeVelocityY = 0;
    beeAccelerationY = 0;
    beeFloor = windowHeight*0.85;
    beeY = 0;
    newBeeY = 0;
  //clear();
  //old images:
  // beeImgRight = loadImage('https://freight.cargo.site/t/original/i/d46cc91e48359a7c329ad4ff4842a2efea7a7244bda89a9807cdd79d01cd4bba/BeeRight.png');
  // beeImgLeft = loadImage('https://freight.cargo.site/t/original/i/e4e97d79863a2f5fa68db43d2e4e525cb317437fe91d6ed0b125c20ab9ad7b55/BeeLeft.png');
  // flowerImg = loadImage('https://freight.cargo.site/t/original/i/e0632307ee83ce275029d81f7990a4fd0debb16d9d6528e90ac0f6c05879d77e/Flower.png');
  
  //new images:
  beeImgLeft = loadImage('https://freight.cargo.site/t/original/i/198a86c2fc4f9e8a0b6b9555f0eb7f5913cac00c2ffbb52e5d41ce4e378206e8/BeeLeft_1.png');
  beeImgRight = loadImage('https://freight.cargo.site/t/original/i/54df8e2518fa95b162aee751299bdecb54d1f73876f6424d66259b610a01c6ba/BeeRight_1.png');
  flowerImg = loadImage('https://freight.cargo.site/t/original/i/5394c6f16b47a6bc7349293aa3fe478f48ba33b9391643fc54394d71b0018f45/Flower2.png');
}
  
function draw() {
  clear(); //clear board
  resizeCanvas(windowWidth, windowHeight); //resize canvas
  background(123, 211, 255, 0); //make background transparent

  //display flower on cursor (With some shifting to make it centered)
  image(flowerImg,mouseX-25,mouseY-25,60,60);
  
  //make bee follow cursor horizontally
  beeVelocityX= (mouseX-beeX)/30; //the mathematical equivalent to an arrow pointing from the bee to the mouse, but 1/30th of the length. the number affects how fast the bee moves to mouse later
  //store in a variable the sum of the current bee's location and the horizontal step it needs to move
  beeX += beeVelocityX;
  //beeX = beeX + beeVelocityX;
  
  //make the bee jump (note that 'beeAcceleration Y' is set to a number when mouse is clicked: see function at the end of this script)
  //beeVelocityY += jumpHeight; //increment velocity by jumpHeight (set to a negative number because -y is up)
  //if bee mid jump (velocity negative --> going up) then slow down it's speed of ascent using gravity
  if (beeVelocityY < -floatSpeed ) { beeVelocityY += gravity }
  else { beeVelocityY = floatSpeed } //otherwise if it's falling faster than terminal velocity, make it float down at a fixed speed
  beeY += beeVelocityY; //add to bee current position the velocity
  if (beeY > beeFloor) {beeY = beeFloor} //if bee is BELOW floor (Since +y is down), put bee back to floor

  //draw bee. based on X velocity direction
  if (beeVelocityX < 0 ) {
    image(beeImgLeft, beeX-50, beeY,80,80);
  } else {
    image(beeImgRight, beeX-50, beeY,80,80);
  }
}
//add a starting velocity to prompt the bee to jump UP (y is up) on mouseClick
  function mouseClicked() { beeVelocityY -= jumpHeight } 
  