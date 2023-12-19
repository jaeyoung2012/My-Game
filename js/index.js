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
let endtimer = 0;
let lasers = [undefined,undefined, undefined,undefined,undefined,undefined,undefined, undefined];

let player = {
    x : 100,
    y : 100,
    w : 70,
    h : 70,
    img : playerImg,
    superMode : false,
    color :"green",
    speed : 4,
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
    if (timer % 35 == 0 && !end) {
        score++
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
    
    if (!end && isMoving) {
        
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
    if (timer % 20 == 0) {
        if (Math.floor(Math.random()*2) == 0) {
            let newY = Math.floor(Math.random()*(screen.width - 101)+1);
            let newY2 = Math.floor(Math.random()*(screen.width - 101)+1);
            let newOne = new Laser(0,newY,screen.width,newY2);
            lasers.push(newOne)
        }else {
            let newX = Math.floor(Math.random()*(screen.width - 101)+1);
            let newX2 = Math.floor(Math.random()*(screen.width - 101)+1);
            let newOne = new Laser(newX,0,newX2,screen.height)
            lasers.push(newOne)
        }
        
        
    }
    if (timer % 10 == 0) {
        if (lasers.length == 9) {
            lasers.shift()
        }
    }

    if (timer % 60 == 0) {
        let newX = Math.floor(Math.random()*(screen.width - 101)+1);
        let newY = Math.floor(Math.random()*(screen.height - 101)+1);
        let newW = Math.floor(Math.random()*player.w+30)
        if (ems.length == maxEm) ems.shift()
        ems.push(new Entity(newX,newY,newW,newW));
    }
    if (timer % 500 == 0 || timer == 0) {
        let newX = Math.floor(Math.random()*(screen.width - 101)+1);
        let newY = Math.floor(Math.random()*(screen.height -101)+1);
        
        
        items.push(new Item(newX,newY,50,50));
    }

    // 아이템 그리기, 충돌처리
    items.map((a)=>{
        collide2(a,player)
        a.draw()
    })
    //적 그리기, 충돌처리
    ems.map((a)=>{
        collide(a,player)
        a.draw()
    })
    // 레이저 그리기 , 충돌처리
    lasers.map((a,i)=>{
        if (i==7 && a != undefined) {
            ctx.lineWidth = 1
        } else if (a != undefined) {
            isIntersection(a.getM(),a.getB())
            ctx.lineWidth = 5;
        }
        if (a != undefined) {
            a.draw()
        }
        
    })
    




    if (end) {
        player.img = playerDieImage;
        player.y+= 3
        document.querySelector("audio").pause()
        endtimer++
        
        if (endtimer > 170) {
            
            cancelAnimationFrame(animation)
            location.replace("replay.html")
            ctx.clearRect(0,0,screen.width,screen.height);
            
            
            if (localStorage.getItem("bestscore") < score) {
                localStorage.setItem("bestscore",score)
            }
            
            localStorage.setItem("score",score)
        }
       
    }
    
    
    if (useItem && itemTimer < itemTime) {
        
        itemTimer++
    } else if(itemTimer >= itemTime) {
        itemTimer = 0;
        useItem = false;
        itemTime = 0;
        
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

function isIntersection(m,b) {
    // 직선과 직사각형의 상하좌우 경계
    const lineTop = m * player.x + b;
    const lineBottom = m * (player.x + player.w) + b;
    const rectTop = player.y;
    const rectBottom = player.y + player.w;
  
    // 교차하는 경우
    if ((lineTop >= rectTop && lineTop <= rectBottom) || (lineBottom >= rectTop && lineBottom <= rectBottom)) {
        if (!useItem) {
            end = true;
        }
    }
  
    // 접하는 경우
    const lineLeft = (player.y - b) / m;
    const lineRight = ((player.y + player.w) - b) / m;
    if ((lineLeft >= player.x && lineLeft <= player.x + player.w) ||
        (lineRight >= player.x && lineRight <= player.x + player.w)) {
            if (!useItem) {
                end = true;
            }
            
    }
  
    // 꼭지점에서 만나는 경우
    const vertexX = player.x;
    const vertexY = player.y;
    if (b === vertexY && m * vertexX + b === vertexY) {
        if (!useItem) {
            end = true;
        }
    }
  
    // 교차하지 않는 경우
    return;
  }