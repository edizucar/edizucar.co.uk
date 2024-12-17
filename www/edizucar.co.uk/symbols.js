const symbols = ['&#x27ff;', '&#x222e;', '&#x2211;', '&#x220B;', '&#x2205;'];
const symbolObjects = [];


// Animation with moving symbols
class Symbol {
    constructor(content) {
        this.element = document.createElement('div');
        this.element.innerHTML = content;
        this.element.style.position = 'absolute';
        this.element.style.fontSize = `${Math.random() * 3 + 1}vw`;
        this.element.style.color = 'rgba(255, 255, 255, 0.7)';
        this.element.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.speedX = (Math.random() - 0.5) * 5;
        this.speedY = (Math.random() - 0.5) * 5;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.cursor = "pointer"
        document.body.appendChild(this.element);

        this.element.addEventListener('click',() => this.onClick());
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > window.innerWidth) {
            this.speedX *= -1;
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.speedY *= -1;
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
    }

    onClick() {
        console.log(Math.random());
        // create exprosion
        for (let i=0; i<10; i++) {
            const babySymbol = new BabySymbol(this.element.innerHTML, this.x+this.speedX, this.y+this.speedY, this.speedX, this.speedY);
            symbolObjects.push(babySymbol);
        }
        this.remove();
    }

    remove() {
        this.element.remove();
        const index = symbolObjects.indexOf(this);
        if (index > -1) {
            symbolObjects.splice(index, 1);
        }
    }

}

class BabySymbol extends Symbol {
    constructor(content, parentX, parentY, parentSpeedX, parentSpeedY) {
        // Call the parent class constructor
        super(content);
        this.speedX = (Math.random() - 0.5) * 5 + parentSpeedX*3;
        this.speedY =(Math.random() - 0.5) * -5 + parentSpeedY*3;
        this.element.style.color = generateNeonColorHSLA();

        this.accX = 0
        this.accY = 0.3
        
        this.x = parentX;
        this.y = parentY;
        this.lifetime = 60 + Math.floor(Math.random() * 30); // frames

        this.element.style.cursor = "default"

        this.element.style.fontSize = `${this.lifetime}vw`;

        // Overwrite the click behavior
        this.onClick = () => {}
    }

    updatePosition() {
        this.x += this.speedX;
        this.y += this.speedY;

        this.speedX += this.accX
        this.speedY += this.accY

        if (this.x < 0 || this.x > window.innerWidth) {
            this.lifetime = -1;
        }
        if (this.y < 0 || this.y > window.innerHeight) {
            this.lifetime = -1;
        }

        this.lifetime--;

        if (this.lifetime < 0) {
            this.remove()
        }

        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.fontSize = `${this.lifetime/60}vw`;
    }

}

function generateNeonColorHSLA() {
    const h = Math.floor(Math.random() * 360); // Random hue: 0–360°
    const s = Math.floor(Math.random() * 21) + 80; // Saturation: 80–100%
    const l = Math.floor(Math.random() * 21) + 50; // Lightness: 50–70%
    const a = 1; // Alpha: fully opaque for neon effect
    return `hsla(${h}, ${s}%, ${l}%, ${a})`;
}




function createSymbols() {
    console.log("hello");
    for (let i = 0; i < 30; i++) {
        const symbol = new Symbol(symbols[Math.floor(Math.random() * symbols.length)]);
        symbolObjects.push(symbol);
    }
}

function enough() {
    symbolObjects.forEach(symbol => {
        if (Math.random() < 0.7) {
            symbol.remove();
        } else {
            symbol.onClick();
        }
    });

}

function animateSymbols() {
    if (symbolObjects.length > 300) {
        enough();
    }
    symbolObjects.forEach(symbol => symbol.updatePosition());
    requestAnimationFrame(animateSymbols);
}