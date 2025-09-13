"use strict";

let $ = document;

let startSection = $.getElementById('startSection');
let content = $.getElementById('content');
let startButton = $.getElementById('startButton');
let audio = $.getElementById('audio');
let clockText = $.getElementById('clockText');
let dateSection = $.getElementById('dateText');
let particlesJsElem = $.getElementById('particles-js');
let toggleParticlesButton = $.getElementById('toggleParticlesButton');
let toggleVocalButton = $.getElementById('toggleVocalButton');

let changeMusicButton = $.getElementById('changeMusicButton');
let resetMusicButton = $.getElementById('resetMusicButton');
let musicInput = $.getElementById('musicInput');

let changeBgButton = $.getElementById('changeBgButton');
let resetBgButton = $.getElementById('resetBgButton');
let bgInput = $.getElementById('bgInput');

let rightMenu = $.getElementById('rightMenu');
let hideRightMenu = $.getElementById('hideRightMenu');

let week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

let startd = false;

let defaultMusic = "./src/assets/audio/1290137131.mp3";
let defaultBg = "";

setTimeout(() => {
    startButton.classList.remove('opacity-0');
}, 1000);

const showTime = () => {
    let date = new Date();

    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = (h >= 12) ? "PM" : "AM";

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    clockText.textContent = `${h} : ${m} : ${s} ${session}`;

    let dayName = week[date.getDay()];
    dateSection.textContent = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}, ${dayName}`;
}

const startButtonHandler = () => {
    startd = true;

    audio.play();

    startButton.classList.add('opacity-0');

    setTimeout(() => {
        startButton.innerText = "Started ...";
    }, 100);

    setTimeout(() => {
        startButton.classList.remove('opacity-0');
    }, 500);

    setTimeout(() => {
        startButton.classList.add('opacity-0');
    }, 1500);

    setTimeout(() => {
        startSection.classList.add('hidden');

        showTime();
        setInterval(showTime, 1000);

        content.classList.remove('hidden');
    }, 2000);
}

const toggleParticlesJS = () => {
    let isHide = particlesJsElem.classList.contains('hidden');

    if (isHide) {
        particlesJsElem.classList.remove('hidden');
        toggleParticlesButton.querySelector('svg').classList.remove('fill-gray-500');
    } else {
        particlesJsElem.classList.add('hidden');
        toggleParticlesButton.querySelector('svg').classList.add('fill-gray-500');
    }
}

const toggleVocal = () => {
    let vocal = toggleVocalButton.querySelector('#vocal');
    let mute = toggleVocalButton.querySelector('#mute');

    if (!startd) {
        startButtonHandler();
        return;
    }

    if (vocal.classList.contains('hidden')) {
        vocal.classList.remove('hidden');
        mute.classList.add('hidden');
        audio.play();
    } else {
        vocal.classList.add('hidden');
        mute.classList.remove('hidden');
        audio.pause();
    }
}

const hideRightMenuHandler = () => {
    let isHide = rightMenu.classList.contains('-translate-y-[85%]');

    if (isHide) {
        rightMenu.classList.remove('-translate-y-[85%]');
        hideRightMenu.textContent = "Hide";
    } else {
        rightMenu.classList.add('-translate-y-[85%]');
        hideRightMenu.textContent = "Show";
    }
}

changeMusicButton.addEventListener('click', () => {
    musicInput.click();
});

musicInput.addEventListener('change', (e) => {
    let file = e.target.files[0];
    if (file) {
        let url = URL.createObjectURL(file);
        audio.src = url;
        audio.play();
    }
});

resetMusicButton.addEventListener('click', () => {
    if (!startd) {
        startButtonHandler();
        return;
    }

    audio.src = defaultMusic;
    audio.play();
});

changeBgButton.addEventListener('click', () => {
    bgInput.click();
});

bgInput.addEventListener('change', (e) => {
    let file = e.target.files[0];
    if (file) {
        let url = URL.createObjectURL(file);

        particlesJsElem.classList.add('hidden');

        document.body.style.backgroundImage = `url(${url})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
    }
});

resetBgButton.addEventListener('click', () => {
    document.body.style.backgroundImage = defaultBg;

    particlesJsElem.classList.remove('hidden');
});

showTime();
setInterval(showTime, 1000);

startButton.addEventListener('click', startButtonHandler);
toggleParticlesButton.addEventListener('click', toggleParticlesJS);
toggleVocalButton.addEventListener('click', toggleVocal);
hideRightMenu.addEventListener('click', hideRightMenuHandler);


