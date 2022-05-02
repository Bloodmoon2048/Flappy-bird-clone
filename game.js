var canvas_x = 400
var canvas_y = 500
var speed = 1.8
var gravity =  0.2
var ground = 480
var birdzone = 10
var score = 0

window.addEventListener('keydown', function(event){
      if (event.key === " "  && birdy.death != true){
        birdy.momentum = 5
      }
  })

function setup() {
  createCanvas(canvas_x, canvas_y);
  pipe1 = new pipes()
  setTimeout(() => { pipe2 = new pipes(); }, 2000);
  birdy = new player()
  
}

function draw() {
  background(220);
  pipe1.update_postion()
  birdy.update_postion()
  if (typeof pipe2 != "undefined"){pipe2.update_postion()}
  textSize(40)
  text(score,180,50,100,100)
  console.log(speed)
}


class pipes{
    constructor(){
        this.x = 400
        this.gap = 80 //random pipe gap
        this.y = Math.floor(Math.random() * (canvas_y-100-this.gap)) + 50 + this.gap //random height for pipe gap 
        this.w = 50
        this.h = canvas_y-this.y
        
    }
    
    update_postion(){
        if ((120 > (this.x - birdzone) && 120 < (this.x + this.w + birdzone) ) && ((birdy.y > this.y - birdzone) || birdy.y < (this.y - this.gap - birdzone))){
            birdy.death = true
        }
        if (birdy.death == false){
            if (this.x <= -50){
            score += 1
            this.x = 400
            }
            fill(0, 204, 0);
            rect(this.x, this.y, this.w, this.h);
            rect(this.x, 0, this.w, this.y - this.gap);
            this.x = this.x - speed
        }else{
            fill(0, 204, 0);
            rect(this.x, this.y, this.w, this.h);
            rect(this.x, 0, this.w, this.y - this.gap);
        }
    }
}

class player{
    constructor(){
        this.x = 120
        this.y = 250
        this.momentum = 0
        this.death = false
    }

    update_postion(){
        if (this.y > ground){
            this.death = true
        }
        if (this.death == false){
            this.momentum = this.momentum - gravity
            this.y = this.y - this.momentum
            fill(255,0,0)
            ellipse(this.x, this.y, 10, 10)
        }else{
            if (this.y < ground){
                this.momentum =  this.momentum - 0.5
                this.y = this.y - this.momentum
            }
            fill(255,0,0)
            ellipse(this.x, this.y, birdzone, birdzone)
        } 
    }
 
}