let enemyImg = new Image();
enemyImg.src = "img/angry.png"

let appleImg = new Image();
appleImg.src = "img/apple.png"
class Entity {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "red"
        this.speed = 0.1
        
    }
    draw() {
        ctx.drawImage(enemyImg,this.x,this.y,this.w,this.h)
    }
    move() {
        
        if (player.x > this.x) {
            this.x += this.speed
        } else if (player.x < this.x) {
            this.x -= this.speed
        }
        if (player.y > this.y) {
            this.y += this.speed
        } else if (player.y < this.y) {
            this.y -= this.speed
        }
    }
}
class Item {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        
        
    }
    draw() {
        
        ctx.drawImage(appleImg,this.x,this.y,this.w,this.h);
    }
    
}
