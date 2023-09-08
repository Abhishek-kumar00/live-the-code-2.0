var btn = document.getElementById('btn');
var todoApp = document.querySelector('.todo-app');
var timerContainer = document.getElementById('timer-container');
var timerDisplay = document.getElementById('timer');
var countdownInput = document.getElementById('countdown-input');
var startCountdownButton = document.getElementById('start-countdown-button');
var stopCountdownButton = document.getElementById('stop-countdown-button');
var resetCountdownButton = document.getElementById('reset-countdown-button');
var countdownInterval;
var isCountdownRunning = false;

function leftClick() {
  btn.style.left = 0;
  showTodo();
}

function midClick() {
  btn.style.left = '65px';
  showTimer();
}

function rightClick() {
  btn.style.left = '140px';
}

function showTodo() {
  todoApp.style.display = 'block';
  timerContainer.style.display = 'none';
  clearInterval(countdownInterval);
}

function showTimer() {
  todoApp.style.display = 'none';
  timerContainer.style.display = 'block';
  resetCountdown();
}

function startCountdown() {
  if (!isCountdownRunning) {
    isCountdownRunning = true;
    startCountdownButton.disabled = true;
    stopCountdownButton.disabled = false;
    resetCountdownButton.disabled = false;

    var inputTime = parseCountdownInput(countdownInput.value);
    var targetTime = new Date().getTime() + inputTime * 1000; // Calculate the target time

    countdownInterval = setInterval(function () {
      var currentTime = new Date().getTime();
      var remainingTime = targetTime - currentTime;

      if (remainingTime <= 0) {
        // Countdown has reached its target
        isCountdownRunning = false;
        clearInterval(countdownInterval);
        startCountdownButton.disabled = false;
        stopCountdownButton.disabled = true;
        resetCountdownButton.disabled = true;
        countdownInput.value = "";
        updateCountdownDisplay(0);
        return;
      }

      var hours = Math.floor(remainingTime / 3600000);
      var minutes = Math.floor((remainingTime % 3600000) / 60000);
      var seconds = Math.floor((remainingTime % 60000) / 1000);

      updateCountdownDisplay(hours, minutes, seconds);
    }, 1000);
  }
}

function stopCountdown() {
  isCountdownRunning = false;
  clearInterval(countdownInterval);
  startCountdownButton.disabled = false;
  stopCountdownButton.disabled = true;
}

function resetCountdown() {
  isCountdownRunning = false;
  clearInterval(countdownInterval);
  startCountdownButton.disabled = false;
  stopCountdownButton.disabled = true;
  resetCountdownButton.disabled = true;
  countdownInput.value = "";
  updateCountdownDisplay(0, 0, 0); // Reset the display to "00:00:00"
}


function parseCountdownInput(input) {
  const parts = input.split(":");
  const hours = parseInt(parts[0]) || 0;
  const minutes = parseInt(parts[1]) || 0;
  const seconds = parseInt(parts[2]) || 0;
  return hours * 3600 + minutes * 60 + seconds;
}

function updateCountdownDisplay(hours, minutes, seconds) {
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  timerDisplay.textContent = formattedTime;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

// Your other functions and event listeners...

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
function addTask() {
  if (inputBox.value === "") {
    alert("you must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();
showTodo();
