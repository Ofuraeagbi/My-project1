let [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
let timer = null;
let isRunning = false;

const display = document.getElementById('time-display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');
const themeToggle = document.getElementById('themeToggle');

function updateDisplay() {
  display.textContent = 
    `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function startTimer() {
  timer = setInterval(() => {
    milliseconds += 1;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
      hours++;
    }
    updateDisplay();
  }, 10);
}

function stopTimer() {
  clearInterval(timer);
}

startStopBtn.addEventListener('click', () => {
  if (!isRunning) {
    startTimer();
    isRunning = true;
  } else {
    stopTimer();
    isRunning = false;
  }
});

resetBtn.addEventListener('click', () => {
  stopTimer();
  [hours, minutes, seconds, milliseconds] = [0, 0, 0, 0];
  updateDisplay();
  laps.innerHTML = '';
  isRunning = false;
});

lapBtn.addEventListener('click', () => {
  const li = document.createElement('li');
  li.textContent = display.textContent;
  laps.appendChild(li);
});

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

updateDisplay();
