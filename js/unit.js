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
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.fillRect(this.x,this.y,this.w-3,this.h-3);
        ctx.strokeRect(this.x,this.y,this.w-3,this.h-3);
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
        this.color = "blue"
        
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.fillRect(this.x,this.y,this.w-3,this.h-3);
        ctx.strokeRect(this.x,this.y,this.w-3,this.h-3);
    }
    
}
class BigItem {
    constructor(x,y,w,h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "yellow";
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.lineWidth = 3;
        ctx.fillRect(this.x,this.y,this.w-3, this.h-3);
        ctx.strokeRect(this.x,this.y,this.w-3,this.h-3);
    }
}