let screen = document.getElementById("screen");
let ctx = screen.getContext("2d");
let speed;
let isMoving = false;
let keyCode = null;
let ems = [];
let maxEm = 15;
let timer = 0;
let animation;
let items = [];
let useItem = false;
let itemTimer = 0;
let itemTime = 0;
let score = 0;
let plusItemTime = 200;
let playerImg = new Image();
playerImg.src = "img/player.png"
let playerDieImage = new Image()
playerDieImage.src = "img/playerDie.png";
let end = false;

let player = {
    x : 100,
    y : 100,
    w : 70,
    h : 70,
    img : playerImg,
    superMode : false,
    color :"green",
    speed : 2,
    draw() {
        ctx.drawImage(this.img,this.x,this.y,this.w,this.h);
        if (this.superMode) {
            ctx.strokeStyle = "gold"
            ctx.lineWidth = 4;
            ctx.strokeRect(this.x-1,this.y-1,this.w+2,this.h+2)
        }
    }
};



function Frame() {
    animation = requestAnimationFrame(Frame);
    screen.width = window.innerWidth - 50;
    screen.height = window.innerHeight -50;
    timer++
    if (timer % 5 == 0 || timer == 1) {
        document.querySelector(".score").innerText = `Score : ${score}`
    }
    if (score % 50 === 0) {
        maxEm = maxEm + score % 25;
        plusItemTime = plusItemTime + score % 5;
    }
    if (! (player.x + player.w < screen.width)) {
        player.x = screen.width -player.w
    }
   
    // 캔버스 
    ctx.clearRect(0,0,screen.width, screen.height);
    player.superMode = useItem;
    if (!end) {
        switch (keyCode) {
            case "KeyW":
                if (player.y > 0) player.y -= player.speed;
                break;
            case "KeyS":
                if (player.y + player.h < screen.height) player.y += player.speed;
                break;
            case "KeyA":
                if (player.x > 0) player.x -= player.speed;
                break;
            case "KeyD":
                if (player.x + player.w < screen.width) player.x += player.speed;
                break;
            default:
                
                break;
        }
    }
    
        player.draw()
    

    // 적군
    if (timer % 1 == 0) {
        ems.map((a)=>{
            a.move()
        })
        
    }
    if (timer % 75 == 0) {
        let newX = Math.floor(Math.random()*(screen.width - 401)+1);
        let newY = Math.floor(Math.random()*(screen.width - 401)+1);
        let newW = Math.floor(Math.random()*player.w+30)
        if (ems.length == maxEm) ems.shift()
        ems.push(new Entity(newX,newY,newW,newW));
    }
    if (timer % 500 == 0) {
        let newX = Math.floor(Math.random()*(screen.width - 401)+1);
        let newY = Math.floor(Math.random()*(screen.height -401)+1);
        
        
        items.push(new Item(newX,newY,50,50));
    }

    items.map((a)=>{
        collide2(a,player)
        a.draw()
    })
    ems.map((a)=>{
        collide(a,player)
        a.draw()
    })

    if (end) {
        player.img = playerDieImage;
        player.y++
        document.querySelector("audio").pause()
        
        setTimeout(()=>{
            location.replace("replay.html")
            cancelAnimationFrame(animation)
            ctx.clearRect(0,0,screen.width,screen.height);
            
            
            if (localStorage.getItem("bestscore") < score) {
                localStorage.setItem("bestscore",score)
            }
            
            localStorage.setItem("score",score)},3000)
       
    }
    
    
    if (useItem && itemTimer < itemTime) {
        player.color = "cyan"
        itemTimer++
    } else if(itemTimer >= itemTime) {
        itemTimer = 0;
        useItem = false;
        itemTime = 0;
        player.color = 'green';
    }
    
}
Frame();

function collide(a,b) {
    var x축차이1 = a.x - (b.x + b.w)
    var x축차이2 = b.x - (a.x + a.w)
    var y축차이1 = a.y - (b.y + b.h)
    var y축차이2 = b.y - (a.y + a.h)
    if (x축차이1 < 0 && x축차이2 < 0 && y축차이1 < 0 && y축차이2 < 0) {
        if (useItem) {
            ems.splice(ems.indexOf(a),1);
            score++
            return;
        }
        end = true;
        
        
    }
}
function collide2(a,b) {
    var x축차이1 = a.x - (b.x + b.w)
    var x축차이2 = b.x - (a.x + a.w)
    var y축차이1 = a.y - (b.y + b.h)
    var y축차이2 = b.y - (a.y + a.h)
    if (x축차이1 < 0 && x축차이2 < 0 && y축차이1 < 0 && y축차이2 < 0) {
        useItem = true;
        items.splice(items.indexOf(a),1)
        
        
        itemTime += plusItemTime;
        score += 5;
    }
}
