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

class Laser {
    constructor(firstX, firstY, secondX, secondY) {
        this.x1 = firstX;
        this.x2 = secondX;
        this.y1 = firstY;
        this.y2 = secondY;
        this.color = "red";
    }
    draw() {
        ctx.strokeStyle = this.color;
        ctx.beginPath();

        function calculateIntersectionX(axisValue, m, b) {
            return (axisValue - b) / m;
        }

        function calculateIntersectionY(axisValue, m, b) {
            return m * axisValue + b;
        }

        // x1 또는 x2가 0일 때
        if (this.x1 === 0 || this.x2 === 0) {
            const m = (this.y2 - this.y1) / (this.x2 - this.x1);
            const b = this.y1 - (this.x1 * m);
            const intersectionY = calculateIntersectionY(screen.height, m, b);
            ctx.moveTo(0, calculateIntersectionY(0, m, b));
            ctx.lineTo(screen.width, intersectionY);
        }

        // y1 또는 y2가 0일 때
        if (this.y1 === 0 || this.y2 === 0) {
            const m = (this.y2 - this.y1) / (this.x2 - this.x1);
            const b = this.y1 - (this.x1 * m);
            const intersectionX = calculateIntersectionX(screen.width, m, b);
            ctx.moveTo(calculateIntersectionX(0, m, b), 0);
            ctx.lineTo(intersectionX, screen.height);
        }

        ctx.stroke();
    }
    getM() {
         const m = (this.y1 - this.y2) / (this.x1 - this.x2);
        return m;
    }
    getB() {
        const m = (this.y1 - this.y2) / (this.x1 - this.x2);
        const b = this.y1 - m * this.x1;
        return b;
    }
}