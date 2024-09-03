//using canvas api

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

///DEFINATIONS
let objects =[];
//control buttons
const runbutton = document.getElementById("run");
const pausebutton = document.getElementById("pause");
const restartbutton = document.getElementById("restart");
const  clearbutton = document.getElementById("clear");
//interface buttons
const onedMotionbutton = document.getElementById("d1m");
const projectileMotionbutton = document.getElementById("pm");
const SHMbutton = document.getElementById("shm");
const Gravitationbutton = document.getElementById("gravitation");
const Collisionbutton = document.getElementById("collision");

//time control definitions
let startTime =performance.now() ;
let previousTime = startTime;

let displayButtons = true;
let flag =false;
let animationID ;

// objects is the list of objects in the canvas
/// CLASSES OF OBJECTS
class Rectangles {
    constructor(x,y,mass,height,width,velocity,angle){
        this.x=x;
        this.y=y;
        this.mass=mass;
        this.height=height;
        this.width=width;
        this.velocity=velocity;
        this.angle=angle;
        this.vel_x = velocity*Math.cos(angle);
        this.vel_y = velocity*Math.sin(angle);
    }
    updateState(deltaTime){

        // new logic Has to be written to account for the difference in x,y and xcom,ycom

        this.x=this.x +this.vel_x*deltaTime ;// new x
        this.y=this.y +this.vel_y*deltaTime ;// new y
    }
    Redraw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle = "black";  // O
        ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

}

///FUNCTIONS

//Animate
function animate(){

    //time 
    const currentTime = performance.now();
    const deltaTime = (currentTime-previousTime)/1000 //converting to seconds
    previousTime=currentTime;

    //update the State of the object
    for(let i=0 ; i< objects.length ;i++){
        objects[i].updateState(deltaTime);
    }
    //Clear The screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    //Redraw current frame
    for(let i=0 ; i< objects.length ;i++){
        objects[i].Redraw();
    }

    //Request Next Frame 
    animationID = requestAnimationFrame(animate);
}

// buttonrunner
function buttonrunner(){
    runbutton.addEventListener("click",() => {
        if(!flag){
            flag =true ;
            previousTime = performance.now(); // Reset previousTime to avoid time jump
            animate(previousTime); 
        }

    });
    pausebutton.addEventListener("click",() =>{
        if(flag){
            flag = false ; //Pausing
            cancelAnimationFrame(animationID);
        }else{
            flag = true ; //Resuming
            previousTime = performance.now(); // Reset previousTime to avoid time jump
            animate(previousTime); 
        }

    })
    clearbutton.addEventListener("click",()=>{
        flag = false ;
        cancelAnimationFrame(animationID);
        ctx.clearRect(0,0,canvas.width,canvas.height);
        previousTime = performance.now(); // Reset the time
        objects = []; // Clear all objects
        
    })
    restartbutton.addEventListener("click",() => {
        flag = false;
        cancelAnimationFrame(animationID); // Stop the current animation
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        previousTime = performance.now(); // Reset the time
        objects = []; // Clear all objects

        // Reinitialize or create new objects if necessary
        objects.push(new Rectangles(100, 100, 1, 100, 100, 20, (Math.PI)/6));
        flag = true;
        animate(); // Restart animation loop

    })

}

//function to hide interface elements when a interface button is clicked 

/// RUNNING CODE

objects.push(new Rectangles(100, 100, 1, 100, 100, 20, (Math.PI)/6));

buttonrunner();

