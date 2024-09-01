//using canvas api

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const hoverColor="#FF69B4";

//change Color on 

///DEFINATIONS


// Functions

//canvas animation on run
const runbutton = document.getElementById("run");
const pausebutton = document.getElementById("pause");
const restartbutton = document.getElementById("restart");
const  clearbutton = document.getElementById("clear")

let startTime =performance.now() ;
let previousTime = startTime;

let flag =false;
let animationID ;

// objects is the list of objects in the canvas
function animate(objects){
    //time 
    const currentTime = performance.now();
    const deltaTime = (currentTime-previousTime)/1000 //converting to seconds
    previousTime=currentTime;

    //update the State of the object
    for(let object in objects){
        object.updateState(deltaTime);
    }
    //Clear The screen
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    //Redraw current frame
    for(let object in objects){
        object.Redraw();
    }

    // Animation boolean logic
    if(flag){
        animationID=window.requestAnimationFrame(animate);
    }
    else
    {
        window.cancelAnimationFrame(animationID);
    }

}
// buttonrunner
function buttonrunner(objects){
    runbutton.addEventListener("click",() => {
        flag =true ;
        animate(objects);
    });
    pausebutton.addEventListener("click",() =>{
        if(flag==true){
            flag = false ; //Pausing
        }else{
            flag = true ; //Resuming
        }

    })
    clearbutton.addEventListener("click",()=>{
        flag = false ;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        
    })
    restartbutton.addEventListener("click",() => {

    })
}



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
    Redraw(){
        ctx.fillStyle= "red";
        ctx.Rect(this.x,this.y,this.width,this.height);
    }
    static giveListOfObjects() {
        
        
    }

}


/// RUNNING CODE
let objects=[];
let rect1 = new Rectangles(100,100,1,100,100,2,0);
buttonrunner(objects);
rect1.Redraw();
objects.push(rect1);

animate(objects);
