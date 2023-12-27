// js에서 각 요소에 접근

const appendTens = document.getElementById('tens');
const appendSeconds = document.getElementById('seconds');
const buttonStart = document.getElementById('button-start');
const buttonStop = document.getElementById('button-stop');
const buttonReset = document.getElementById('button-reset');

let seconds = 0;
let tens = 0;
let interval;

// start button 클릭 시 이벤트리스너 호출
buttonStart.onclick = function () {
    interval = setInterval(startTimer, 10); // 1/100초마다 startTimer 함수를 작동
}

buttonStop.onclick = function () {
    clearInterval(interval); // setInterval 함수 리턴 중단
}

buttonReset.onclick = function () {
    clearInterval(interval); // reset시에도 startTimer 함수 중단
    seconds = 0;
    tens = 0;
    appendSeconds.innerText = 0;
    appendTens.innerText = 0;

}

function startTimer() {
    tens++; // tens는 1씩 계속 증가

    if (tens > 99) {
        // 100이 되면 seconds 1 올리기
        seconds++; 
        // appendSeconds에도 반영
        appendSeconds.innerText = seconds;
        // 1초 초과 시 다시 리셋
        tens = 0;
        appendTens.innerText = 0;
    } else {
        appendTens.innerText = tens; 
    }
}

