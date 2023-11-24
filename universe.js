let a = [0, 0];
window.onmousemove = (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    if (a[0] + 100 <= mouseX || a[1] + 100 < mouseY || a[0] - 100 >= mouseX || a[1] - 100 > mouseY) {
        let dot = document.createElement('i');
        let dot1 = document.createElement('i');
        a[0] = mouseX;
        a[1] = mouseY;
        dot.style.position = 'absolute';
        dot.style.width = '5px';
        dot.style.height = '5px';
        dot.style.color = getRandomColor();
        dot.style.zIndex = '99999'

        dot1.style.position = 'absolute';
        dot1.style.width = '5px';
        dot1.style.height = '5px';
        dot1.style.color = getRandomColor();
        dot1.style.zIndex = '99998'

        dot1.style.left = mouseX + 7 + 'px';
        dot1.style.top = (mouseY +35)+ 'px';
        dot1.classList.add('fa-solid', 'fa-star', 'fa-bounce', "fall");

        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 30+'px';
        dot.classList.add('fa-solid', 'fa-star', "fa-xs", "fall");


        document.body.appendChild(dot);
        setTimeout(() => {
            dot.remove();
        }, 2000);
        document.body.appendChild(dot1);
        setTimeout(() => {
            dot1.remove();
        }, 2000);
    }
};

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const STAR_SIZE = 1;
const STAR_MIN_SCALE = 0.2;
const OVERFLOW_THRESHOLD = 150;
const STAR_COUNT = (window.innerWidth + window.innerHeight) / 8;
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
let scale = 1;
let width;
let height;
let stars = [];
let pointerX;
let pointerY;
let velocity = { x: 0, y: 0, tx: 50, ty: 50, z: 0.0009 };
let touchInput = false;
generate();
resize();
step();
window.onresize = resize;
canvas.onmousemove = onMouseMove;
canvas.ontouchmove = onTouchMove;
canvas.ontouchend = onMouseLeave;
document.onmouseleave = onMouseLeave;
function generate() {
    for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
            x: 0,
            y: 0,
            z: STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE),
        });
    }
}
function placeStar(star) {
    star.x = Math.random() * width;
    star.y = Math.random() * height;
}
function recycleStar(star) {
    let direction = 'z';
    let vx = Math.abs(velocity.x);
    let vy = Math.abs(velocity.y);
    if (vx > 1 || vy > 1) {
        let axis;
        if (vx > vy) {
            axis = Math.random() < vx / (vx + vy) ? 'h' : 'v';
        } else {
            axis = Math.random() < vy / (vx + vy) ? 'v' : 'h';
        }
        if (axis === 'h') {
            direction = velocity.x > 0 ? 'l' : 'r';
        } else {
            direction = velocity.y > 0 ? 't' : 'b';
        }
    }
    star.z = STAR_MIN_SCALE + Math.random() * (1 - STAR_MIN_SCALE);
    if (direction === 'z') {
        star.z = 0.1;
        star.x = Math.random() * width;
        star.y = Math.random() * height;
    } else if (direction === 'l') {
        star.x = -OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 'r') {
        star.x = width + OVERFLOW_THRESHOLD;
        star.y = height * Math.random();
    } else if (direction === 't') {
        star.x = width * Math.random();
        star.y = -OVERFLOW_THRESHOLD;
    } else if (direction === 'b') {
        star.x = width * Math.random();
        star.y = height + OVERFLOW_THRESHOLD;
    }
}
function resize() {
    scale = window.devicePixelRatio || 1;
    width = window.innerWidth * scale;
    height = window.innerHeight * scale;
    canvas.width = width;
    canvas.height = height;
    stars.forEach(placeStar);
}
function step() {
    context.clearRect(0, 0, width, height);
    update();
    render();
    requestAnimationFrame(step);
}
function update() {
    velocity.tx *= 0.96;
    velocity.ty *= 0.96;
    velocity.x += (velocity.tx - velocity.x) * 0.8;
    velocity.y += (velocity.ty - velocity.y) * 0.8;
    stars.forEach((star) => {
        star.x += velocity.x * star.z;
        star.y += velocity.y * star.z;
        star.x += (star.x - width / 2) * velocity.z * star.z;
        star.y += (star.y - height / 2) * velocity.z * star.z;
        star.z += velocity.z;
        if (
            star.x < -OVERFLOW_THRESHOLD ||
            star.x > width + OVERFLOW_THRESHOLD ||
            star.y < -OVERFLOW_THRESHOLD ||
            star.y > height + OVERFLOW_THRESHOLD
        ) {
            recycleStar(star);
        }
    });
}
function render() {
    stars.forEach((star) => {
        context.beginPath();
        context.lineCap = 'round';
        context.lineWidth = STAR_SIZE * star.z * scale;
        context.globalAlpha = 0.5 + 0.5 * Math.random();
        context.strokeStyle = "white";
        context.beginPath();
        context.moveTo(star.x, star.y);
        let tailX = velocity.x * 2;
        let tailY = velocity.y * 2;
        if (Math.abs(tailX) < 0.1) tailX = 0.5;
        if (Math.abs(tailY) < 0.1) tailY = 0.5;
        context.lineTo(star.x + tailX, star.y + tailY);
        context.stroke();
    });
}
function movePointer(x, y) {
    if (typeof pointerX === 'number' && typeof pointerY === 'number') {
        let ox = x - pointerX;
        let oy = y - pointerY;
        velocity.tx = velocity.tx + (ox / 8) * scale * (touchInput ? 1 : -1);
        velocity.ty = velocity.ty + (oy / 8) * scale * (touchInput ? 1 : -1);
    }
    pointerX = x;
    pointerY = y;
}


function onMouseMove(event) {
    touchInput = false;
    movePointer(event.clientX, event.clientY);
}
function onTouchMove(event) {
    touchInput = true;
    movePointer(event.touches[0].clientX, event.touches[0].clientY, true);
    event.preventDefault();
}
function onMouseLeave() {
    pointerX = null;
    pointerY = null;
}




let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;
let currentZoom = 1;
const zoomStep = 0.1;
const maxMoveX = 100;
const maxMoveY = 100;
let offsetX = 0;
let offsetY = 0;
const bodyWidth = document.body.clientWidth;
const bodyHeight = document.body.clientHeight;
const container = document.querySelector('.container');

container.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX - container.offsetLeft;
    startY = e.clientY - container.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const left = e.clientX - startX;
        const top = e.clientY - startY;
        canvas.style.height = "100%";
        canvas.style.width = "100%"
        offsetX = left;
        offsetY = top;
        if (left >= 0 && left + container.offsetWidth <= bodyWidth) {
            container.style.left = `${left}px`;
        }
        if (top >= 0 && top + container.offsetHeight <= bodyHeight) {
            container.style.top = `${top}px`;
        }
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});