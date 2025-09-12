"use strict";

let $ = document;

let startSection = $.getElementById('startSection');
let content = $.getElementById('content');
let startButton = $.getElementById('startButton');
let audio = $.getElementById('audio');
let clockText = $.getElementById('clockText');
let dateSection = $.getElementById('dateText');

var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

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

showTime();
setInterval(showTime, 1000);

startButton.addEventListener('click', startButtonHandler);