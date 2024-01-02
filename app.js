'use strict';

// Non-concurrent stopwatches

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

// let my = JSON.stringify({a: 2, b: 3})
// localStorage.setItem('javascript', my);
// console.log(localStorage)
// localStorage.clear();


class Stopwatch {
    constructor(name, initialMs, extension) {
        this.name = name;
        this.initialMs = initialMs;
        this.extension = extension;
        
        this.isRunning = false;
        
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

        // PC Config
        /* this.mouseDown = false;

        this.mainEl.addEventListener('mousedown', (e) => {
            this.mouseDown = true;
            setTimeout(()=>{
                if(this.mouseDown) {
                    this.restart();
                }
            }, 1000);

            if (!this.isRunning) {
                this.start();
            } else {
                this.stop();
            }
        })

        this.mainEl.addEventListener('mouseup', (e) => {
            this.mouseDown = false;
        }) */

        // Mobile Config
        this.touchDown = false;

        this.mainEl.addEventListener('touchstart', (e) => {
            this.touchDown = true;
            setTimeout(()=>{
                if(this.touchDown) {
                    this.restart();
                }
            }, 1500);

            if (!this.isRunning) {
                this.start();
            } else {
                this.stop();
            }
        })

        this.mainEl.addEventListener('touchend', (e) => {
            this.touchDown = false;
        })
    }

    start() {
        // console.log('START');
        this.mainEl.classList.add('active');
        this.mainEl.classList.remove('virgin');

        this.startedAt = Date.now() - this.initialMs; // unit: ms
        this.isRunning = true;
        this.isRunning = setInterval(() => {this.update()}, 500); // Why did I have to id like this instead of just 'this.update'? Print 'this' in update.
    }

    stop() {
        // console.log('STOP');
        this.mainEl.classList.remove('active');

        clearInterval(this.isRunning);
        this.initialMs = Date.now() - this.startedAt;
        this.isRunning = false;
    }

    update() {
        const totalMs = Date.now() - this.startedAt;
        this.changeTime(totalMs);
        this.save(totalMs);
    }

    restart() {
        if(this.isRunning) this.stop();
        this.mainEl.classList.add('virgin');
        this.initialMs = 0;
        this.save(0);
        this.changeTime(this.initialMs);
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

    save(value) {
        localStorage.setItem(this.name, JSON.stringify({initialMs: value, extension: this.extension}));
        console.log(localStorage);
    }
}




// allStopwatches.push(new Stopwatch('JavaScript', 0, 'svg'));
// allStopwatches.push(new Stopwatch('Java', 0, 'webp'));
// allStopwatches.push(new Stopwatch('Discrete Mathematics', 0, 'svg'));

allStopwatches['JavaScript'] = new Stopwatch('JavaScript', 0, 'svg');
allStopwatches['HTML & CSS'] = new Stopwatch('HTML & CSS', 0, 'svg');
allStopwatches['Marketing'] = new Stopwatch('Marketing', 0, 'svg');
allStopwatches['Decoded'] = new Stopwatch('Decoded', 0, 'svg');
allStopwatches['UI'] = new Stopwatch('UI', 0, 'svg');
allStopwatches['UX'] = new Stopwatch('UX', 0, 'svg');
allStopwatches['SEO'] = new Stopwatch('SEO', 0, 'png');
allStopwatches['Java'] = new Stopwatch('Java', 0, 'webp');
allStopwatches['Discrete Mathematics'] = new Stopwatch('Discrete Mathematics', 0, 'svg');
allStopwatches['STEM'] = new Stopwatch('STEM', 0, 'png');
allStopwatches['Firebase'] = new Stopwatch('Firebase', 0, 'svg');
allStopwatches['Macro and 20th'] = new Stopwatch('Macro and 20th', 0, 'svg');

Object.keys(localStorage).forEach(name => {
    console.log(name)

    const data = JSON.parse(localStorage.getItem(name));
    if (data?.initialMs) {
        allStopwatches[name].initialMs = data.initialMs;
        allStopwatches[name].changeTime(data.initialMs);
        allStopwatches[name].mainEl.classList.remove('virgin');
    }
    // allStopwatches[name].initialMs = localStorage.getItem(name);
})

// localStorage.clear();
// console.log(localStorage);



// let my = JSON.stringify({a: 2, b: 3})
// localStorage.setItem('javascript', my);
// console.log(localStorage)
// localStorage.clear();

// const testing = document.querySelector('.testing');
// const mUp = testing.querySelector('.m-up');
// const mDown = testing.querySelector('.m-down');
// const mSeconds = testing.querySelector('.m-seconds');
