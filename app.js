'use strict';

const mainContainer = document.querySelector('.main-stopwatches-container');
const allStopwatches = [];

function pad(n) {
    if (n>9) return ''+n;
    else return '0'+n;
}

/* function pad2(n) {
    n = ''+n;
    if (n<10) n='0'+n;
    return n[0]+n[1];
} */

class Stopwatch {
    constructor(name, initialMs, extension) {
        this.name = name;
        this.isRunning = false;
        this.initialMs = initialMs;
        this.startedAt;

        this.mainEl = document.createElement('div');
        this.mainEl.classList.add('stopwatch');

        this.mainEl.innerHTML = `
            <img src="assets/${name}.${extension}">
            <div class="no-img">
                <h2>${name}</h2>
                <p class="time"></p>
            </div>
            <div class="circle"></div>
        `
        this.timeEl = this.mainEl.querySelector('.time');
        this.changeTime(initialMs);

        if(initialMs === 0) {
            this.mainEl.classList.add('virgin');
        }

        mainContainer.append(this.mainEl);

        this.mainEl.addEventListener('click', (e) => {
            console.log(this.name);
            if (!this.isRunning) {
                this.start();
            } else {
                this.stop();
            }
        })
    }

    start() {
        console.log('START');
        this.mainEl.classList.toggle('active');
        this.mainEl.classList.remove('virgin');

        this.startedAt = Date.now() - this.initialMs; // unit: ms
        this.isRunning = true;
        this.isRunning = setInterval(() => {this.update()}, 1000); // Why did I have to id like this instead of just 'this.update'? Print 'this' in update.
    }

    stop() {
        console.log('STOP');
        this.mainEl.classList.toggle('active');

        clearInterval(this.isRunning);
        this.initialMs = Date.now() - this.startedAt;
        this.isRunning = false;
    }

    update() {
        const totalMs = Date.now() - this.startedAt;
        this.changeTime(totalMs);
    }

    changeTime(msQuantity) {
        this.timeEl.innerHTML = `
            <span>${pad(Math.floor(msQuantity / 1000 / 60 / 60))}</span>
            <span>:</span>
            <span>${pad(Math.floor(msQuantity / 1000 / 60 % 60))}</span>
            <span>:</span>
            <span>${pad(Math.floor(msQuantity / 1000 % 60))}</span>
            
        `
        // <span class="ms">${pad2(msQuantity % 1000)}</span>
    }
}




allStopwatches.push(
    new Stopwatch('JavaScript', 89056560, 'svg')
)
allStopwatches.push(
    new Stopwatch('Java', 0, 'webp')
)
allStopwatches.push(
    new Stopwatch('Discrete Mathematics', 0, 'svg')
)

// console.log(allStopwatches[0]);


