const blog = document.createElement('canvas');
document.body.appendChild(blog);
blog.style.position = 'absolute';
blog.style.border = '3px dotted blue';
blog.style.borderRadius = '50%';
blog.style.left = '40%';
blog.style.top = '30%';
const ctx = blog.getContext('2d');
let scaleFactor = 1;
const scaleMultiplier = 0.1;
const initialWidth = 400;
const initialHeight = 400;
blog.width = initialWidth;
blog.height = initialHeight;
let isDragging = false;
let offsetX, offsetY;

redrawCanvas();

blog.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - blog.offsetLeft;
    offsetY = e.clientY - blog.offsetTop;
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const newLeft = e.clientX - offsetX;
        const newTop = e.clientY - offsetY;

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const elementWidth = blog.offsetWidth;
        const elementHeight = blog.offsetHeight;


        if (newLeft >= 0 && newLeft + elementWidth <= screenWidth &&
            newTop >= 0 && newTop + elementHeight <= screenHeight) {
            blog.style.left = newLeft + 'px';
            blog.style.top = newTop + 'px';

        }
    }
});

blog.addEventListener('click', (e) => {
    const mouseX = e.clientX - blog.getBoundingClientRect().left;
    const mouseY = e.clientY - blog.getBoundingClientRect().top;

    const circleCenterX = blog.width / 2;
    const circleCenterY = blog.height / 2;
    const radius = 50 * scaleFactor;

    const distanceFromCenter = Math.sqrt(
        Math.pow(mouseX - circleCenterX, 2) + Math.pow(mouseY - circleCenterY, 2)
    );

    if (distanceFromCenter <= radius) {
        window.location.href = 'index.html';
    }
});
blog.addEventListener('mouseup', () => {
    isDragging = false;
});

blog.addEventListener('wheel', (e) => {
    e.preventDefault();

    const delta = e.deltaY > 0 ? -1 : 1;

    scaleFactor += delta * scaleMultiplier;


    scaleFactor = Math.min(Math.max(0.1, scaleFactor), 1.5);


    const newWidth = initialWidth * scaleFactor;
    const newHeight = initialHeight * scaleFactor;

    blog.width = newWidth;
    blog.height = newHeight;


    redrawCanvas();
});

function redrawCanvas() {

    ctx.clearRect(0, 0, blog.width, blog.height);

    const circleCenterX = blog.width / 2;
    const circleCenterY = blog.height / 2;
    const radius = 50 * scaleFactor;

    ctx.beginPath();
    ctx.arc(circleCenterX, circleCenterY, radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.font = '10px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText('Profolio Website', circleCenterX, circleCenterY);
}
