const canvas = document.querySelector("canvas");
canvas.width = innerWidth; 
canvas.height = innerHeight;
const c = canvas.getContext("2d");

// define Player
class Player{
    constructor( x, y , radius , color){
        this.x = x;
        this.y = y ;
        this.radius = radius ;
        this.color = color;
    }
  
    draw(){
        c.beginPath();
        c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        c.fillStyle = this.color;
        c.fill();
    }
    
}

class Projectiles{
    constructor(x , y , radius , color,velocity){
        this.x = x ;
        this.y = y;
        this.radius = radius ;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        c.beginPath();
        c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}


class Enemy{
    constructor(x , y , radius , color,velocity){
        this.x = x ;
        this.y = y;
        this.radius = radius ;
        this.color = color;
        this.velocity = velocity;
    }

    draw(){
        c.beginPath();
        c.arc(this.x , this.y , this.radius , 0 , Math.PI * 2 , false);
        c.fillStyle = this.color;
        c.fill();
    }
    update(){
        this.draw();
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }
}
// player
const x = canvas.width / 2;
const y = canvas.height /2;
const player = new Player(x , y ,9 , "white");

// Projectiles 
const projectiles = [];
//Enemies 
const enemies = [];

//function swapnEnemy 
function spwanEnemy(){
    
setInterval(() => {
    const color =  `hsl(${Math.random() * 360}, 50% , 50%)`
    const radius = Math.random() * (30 - 10) + 10;
let x , y 
if(Math.random() < 0.5){
    x = Math.random() < 0.5 ? 0 - radius : canvas.width + radius;
    y =  Math.random() * canvas.height;
}else{
    x = Math.random() * canvas.width;
    y = Math.random() < 0.5 ? 0 - radius : canvas.height + radius;
}
    const angle = Math.atan2(canvas.height/2 - y, canvas.width/2 -x);
    const velocity = {
        x : Math.cos(angle) ,
        y : Math.sin(angle)
    } 
enemies.push(new Enemy(x , y , radius ,color,  velocity))
// console.log(enemies);
}, 1000);
}


// Function loop
let animationId;
function loop(){
    animationId = requestAnimationFrame(loop);
    c.fillStyle = "rgba(0 , 0  , 0 , 0.1)"
    c.fillRect(0,0,canvas.width , canvas.height)
    player.draw();
    projectiles.forEach((projectile, index) =>{
        projectile.update();

        if(projectile.x + projectile.radius < 0||
            projectile.x - projectile.radius > canvas.width||
            projectile.y + projectile.radius< 0||
            projectile.y - projectile.radius > canvas.height){
            setTimeout(() => {
                
                projectiles.splice(index , 1);   
            }, 0);   
        }
    })

    enemies.forEach((enemy ,index) =>{
        enemy.update();
        const dist =  Math.hypot(player.x - enemy.x  , player.y - enemy.y )
        if(dist - enemy.radius - player.radius < 1){
            cancelAnimationFrame(animationId);
        }
        projectiles.forEach((projectile ,PROindex) =>{
           const dist =  Math.hypot(projectile.x - enemy.x  , projectile.y - enemy.y )
           if(dist - enemy.radius - projectile.radius < 1){
            // console.log("remove");
            setTimeout(() => {
                enemies.splice(index , 1);
                projectiles.splice(PROindex , 1);   
            }, 0);
            
           }
        })
    })

}


addEventListener("click" , (event)=>{ 
    console.log(projectiles)
    const angle = Math.atan2(event.clientY - canvas.height/2, event.clientX - canvas.width/2);
    const velocity = {
        x : Math.cos(angle) * 6 ,
        y : Math.sin(angle) * 6
    }  
    projectiles.push(new Projectiles(canvas.width /2 , canvas.height /2 , 7 , "white" , velocity))
})

loop()
spwanEnemy();