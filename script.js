var btn=document.getElementById('btn');
var todoApp = document.querySelector('.todo-app');
var timerContainer = document.getElementById('timer-container');
var timerDisplay = document.getElementById('timer');
var startButton = document.getElementById('start-button');
var stopButton = document.getElementById('stop-button');
var timerInterval;
var isTimerRunning = false;
function leftClick(){
    btn.style.left=0;
    showTodo();


}
function midClick(){
    btn.style.left='65px';
    showTimer();
  
}
function rightClick(){
    btn.style.left='140px';
}
function showTodo() {
  todoApp.style.display = 'block';
  timerContainer.style.display = 'none';
  clearInterval(timerInterval);
}
function showTimer() {
  todoApp.style.display = 'none';
  timerContainer.style.display = 'block';
  startTimer();
}
function startTimer() {
  if (!isTimerRunning) {
      isTimerRunning = true;
      startButton.disabled = true;
      stopButton.disabled = false;

      let seconds = 0;
      let minutes = 0;
      let hours = 0;

      timerInterval = setInterval(function () {
          seconds++;
          if (seconds === 60) {
              seconds = 0;
              minutes++;
              if (minutes === 60) {
                  minutes = 0;
                  hours++;
              }
          }

          updateTimerDisplay(hours, minutes, seconds);
      }, 1000);
  }
}

function stopTimer() {
  isTimerRunning = false;
  clearInterval(timerInterval);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function updateTimerDisplay(hours = 0, minutes = 0, seconds = 0) {
  const formattedTime = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  timerDisplay.textContent = formattedTime;
}

function pad(value) {
  return value.toString().padStart(2, '0');
}

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
