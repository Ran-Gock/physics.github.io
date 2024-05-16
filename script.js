let scaleContainers = document.querySelectorAll('.scale-container');

let square = document.querySelector('.square');
let dots = [];
let temp = 450;
let speed = (temp-200)/100;
let dotsLen = 100;

let squareWidth = square.clientWidth;
let squareHeight = square.clientHeight;

function moveDots() {
    const squareWidth = square.clientWidth;
    const squareHeight = square.clientHeight;

    dots.forEach(dot => {
        let currentLeft = parseFloat(dot.style.left);
        let currentTop = parseFloat(dot.style.top);
        let vx = parseFloat(dot.dataset.vx) * speed;
        let vy = parseFloat(dot.dataset.vy) * speed;

        if (currentLeft + vx <= 0 || currentLeft + vx >= squareWidth - 10) {
            vx = -vx;
            dot.dataset.vx = vx / speed;
        }
        if (currentTop + vy <= 0 || currentTop + vy >= squareHeight - 10) {
            vy = -vy;
            dot.dataset.vy = vy / speed;
        }

        currentLeft = Math.min(squareWidth - 10, Math.max(0, currentLeft + vx));
        currentTop = Math.min(squareHeight - 10, Math.max(0, currentTop + vy));

        dot.style.left = `${currentLeft}px`;
        dot.style.top = `${currentTop}px`;
    });
}

function createDots(num) {
    dots.forEach(dot => {
        dot.remove();
    })
    for (let i = 0; i < num; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.style.left = `${Math.random() * (squareWidth - 10)}px`;
        dot.style.top = `${Math.random() * (squareHeight - 10)}px`;
        square.appendChild(dot);
        
        const angle = Math.random() * 2 * Math.PI;
        dot.dataset.vx = Math.cos(angle) * speed;
        dot.dataset.vy = Math.sin(angle) * speed;
        
        dots.push(dot);
    }
}

for (let i = 0; i < 50; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = `${Math.random() * (square.clientWidth - 10)}px`;
    dot.style.top = `${Math.random() * (square.clientHeight - 10)}px`;
    square.appendChild(dot);
        
    const angle = Math.random() * 2 * Math.PI;
    dot.dataset.vx = Math.cos(angle) * speed;
    dot.dataset.vy = Math.sin(angle) * speed;
        
    dots.push(dot);
}

setInterval(moveDots, 20);

let resizeObserver = new ResizeObserver((entries) => {
    document.querySelectorAll('.scale-title')[2].textContent = 'Объем газа: 14нм x ' + (square.clientWidth/square.clientHeight*14).toFixed(2) + 'нм = ' + (square.clientWidth/square.clientHeight*14*14).toFixed(2) + 'нм²';
    document.querySelectorAll('.calc')[1].textContent = '2/3 × (' + dotsLen + '/' + (square.clientWidth/square.clientHeight*14*14).toFixed(2) + ') × ' + (3/2*temp*1.38/10).toFixed(2) + ' × 10¹⁸ × 10⁻²²' + ' = ' + (2/3*((dotsLen)/(square.clientWidth/square.clientHeight*14*14))*(3/2*temp*1.38/10)).toFixed(2) + ' × 10⁻⁵ Па'
});

let targetElement = document.querySelector('.square');

resizeObserver.observe(targetElement);
document.querySelectorAll('.calc')[0].textContent = '3/2 × ' + 450 + ' × 1.38×10⁻²³' + ' ≈ ' + (3/2*450*1.38/10).toFixed(2) + ' × 10⁻²²' + ' Дж'
document.querySelectorAll('.calc')[1].textContent = '2/3 × (' + dotsLen + '/' + (square.clientWidth/square.clientHeight*14*14).toFixed(2) + ') × ' + (3/2*temp*1.38/10).toFixed(2) + ' × 10¹⁸ × 10⁻²²' + ' = ' + (2/3*((dotsLen)/(square.clientWidth/square.clientHeight*14*14))*(3/2*temp*1.38/10)).toFixed(2) + ' × 10⁻⁵ Па'

scaleContainers.forEach(container => {
    let decreaseBtn = container.querySelector('.decrease');
    let increaseBtn = container.querySelector('.increase');
    let scaleInner = container.querySelector('.scale-inner');

    let intervalId;

    scaleInner.style.width = '50%';

    let changeColor = (element) => {
        let widthPercentage = parseFloat(element.style.width) || 0;
        let value = Math.round((widthPercentage));
    
        let red, green, blue;
    
        if (value <= 50) {
            red = Math.round(80 + (value * (80 - 80)) / 50);
            green = Math.round(80 + (value * (175 - 80)) / 50);
            blue = Math.round(175 - (value * (175 - 80)) / 50);
        } else {
            red = Math.round(80 + ((value - 50) * (175 - 80)) / 50);
            green = Math.round(175 - ((value - 50) * (175 - 80)) / 50);
            blue = Math.round(80 + ((value - 50) * (80 - 80)) / 50);
        }
    
        element.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
    };

    let changeWidth = (change) => {
        let currentWidth = parseFloat(scaleInner.style.width);
        currentWidth = Math.max(0, Math.min(100, currentWidth + change));
        scaleInner.style.width = currentWidth.toString() + '%';
        changeColor(scaleInner);
        if(scaleInner == document.querySelectorAll('.scale-inner')[0]) {
            let numScale = document.querySelectorAll('.scale-inner')[0];
            let numDots = Math.round(((parseFloat(numScale.style.width) || 0)));
            dotsLen = numDots*2;
            createDots(numDots*2);
            document.querySelectorAll('.scale-title')[0].textContent = 'Количество молекул: ' + numDots*2;
            document.querySelectorAll('.calc')[1].textContent = '2/3 × (' + dotsLen + '/' + (square.clientWidth/square.clientHeight*14*14).toFixed(2) + ') × ' + (3/2*temp*1.38/10).toFixed(2) + ' × 10¹⁸ × 10⁻²²' + ' = ' + (2/3*((dotsLen)/(square.clientWidth/square.clientHeight*14*14))*(3/2*temp*1.38/10)).toFixed(2) + ' × 10⁻⁵ Па'
        }
        if(scaleInner == document.querySelectorAll('.scale-inner')[1]) {
            temp = (Math.round(((parseFloat(scaleInner.style.width) || 0)))+100)*3;
            document.querySelectorAll('.scale-title')[1].textContent = 'Температура: ' + temp + "K";
            speed = (temp-200)/100;
            document.querySelectorAll('.calc')[0].textContent = '3/2 × ' + temp + ' × 1.38×10⁻²³' + ' ≈ ' + (3/2*temp*1.38/10).toFixed(2) + ' × 10⁻²² Дж'
            document.querySelectorAll('.calc')[1].textContent = '2/3 × (' + dotsLen + '/' + (square.clientWidth/square.clientHeight*14*14).toFixed(2) + ') × ' + (3/2*temp*1.38/10).toFixed(2) + ' × 10¹⁸ × 10⁻²²' + ' = ' + (2/3*((dotsLen)/(square.clientWidth/square.clientHeight*14*14))*(3/2*temp*1.38/10)).toFixed(2) + ' × 10⁻⁵ Па'
        }
    };

    let startChangingWidth = (change) => {
        changeWidth(change);
        intervalId = setInterval(() => changeWidth(change), 100);
    };

    let stopChangingWidth = () => {
        clearInterval(intervalId);
    };

    decreaseBtn.addEventListener('mousedown', () => startChangingWidth(-5));
    decreaseBtn.addEventListener('mouseup', stopChangingWidth);
    decreaseBtn.addEventListener('mouseleave', stopChangingWidth);

    increaseBtn.addEventListener('mousedown', () => startChangingWidth(5));
    increaseBtn.addEventListener('mouseup', stopChangingWidth);
    increaseBtn.addEventListener('mouseleave', stopChangingWidth);
});

