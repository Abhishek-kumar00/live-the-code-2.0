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
  showJournal(); // Call showJournal() when the "Journal" tab is clicked
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
// Add these variables to your existing code
var journalContainer = document.getElementById('journal-container');
var journalEntryInput = document.getElementById('journal-entry');
var journalEntries = document.getElementById('journal-entries');

// Function to add a journal entry
function addJournalEntry() {
  var entryText = journalEntryInput.value;
  
  if (entryText.trim() === '') {
    alert('Please write an entry before adding it to your journal.');
    return;
  }

  var currentTime = new Date();
  var formattedTime = currentTime.toLocaleString();

  var entryElement = document.createElement('div');
  entryElement.classList.add('journal-entry');
  entryElement.innerHTML = `<p>${formattedTime}</p><p>${entryText}</p><button onclick="deleteJournalEntry(this)">Delete</button>`;
  journalEntries.appendChild(entryElement);

  // Clear the input field
  journalEntryInput.value = '';
}

// Function to delete a journal entry
function deleteJournalEntry(entryElement) {
  entryElement.parentElement.remove();
}
// Add these variables to your existing code
var journalContainer = document.getElementById('journal-container');
var todoApp = document.querySelector('.todo-app');
var timerContainer = document.getElementById('timer-container');

// Function to show the journal section and hide others
function showJournal() {
  journalContainer.style.display = 'block';
  todoApp.style.display = 'none';
  timerContainer.style.display = 'none';
  resetCountdown(); // If you want to reset the timer when switching to the journal tab
}
// Add these variables to your existing code
var journalContainer = document.getElementById('journal-container');
var todoApp = document.querySelector('.todo-app');
var timerContainer = document.getElementById('timer-container');

// Function to show the journal section and hide others
function showJournal() {
  journalContainer.style.display = 'block';
  todoApp.style.display = 'none';
  timerContainer.style.display = 'none';
  resetCountdown(); // If you want to reset the timer when switching to the journal tab
}

// Function to hide the journal section
function hideJournal() {
  journalContainer.style.display = 'none';
}

// Update the click event functions
function leftClick() {
  btn.style.left = 0;
  showTodo();
  hideJournal(); // Hide the journal section when To-Do tab is clicked
}

function midClick() {
  btn.style.left = '65px';
  showTimer();
  hideJournal(); // Hide the journal section when Timer tab is clicked
}

function rightClick() {
  btn.style.left = '140px';
  showJournal(); // Show the journal section when Journal tab is clicked
}

// Add these variables to your existing code
var journalEntries = document.getElementById('journal-entries');
var journalEntryInput = document.getElementById('journal-entry');

// Load journal entries from localStorage when the page loads
function loadJournalEntries() {
  var storedEntries = localStorage.getItem('journalEntries');
  if (storedEntries) {
    journalEntries.innerHTML = JSON.parse(storedEntries);
  }
}

// Function to add a journal entry
function addJournalEntry() {
  var entryText = journalEntryInput.value;

  if (entryText.trim() === '') {
    alert('Please write an entry before adding it to your journal.');
    return;
  }

  var currentTime = new Date();
  var formattedTime = currentTime.toLocaleString();

  var entryElement = document.createElement('div');
  entryElement.classList.add('journal-entry');
  entryElement.innerHTML = `<p>${formattedTime}</p><p>${entryText}</p><button onclick="deleteJournalEntry(this)">Delete</button>`;
  journalEntries.appendChild(entryElement);

  // Clear the input field
  journalEntryInput.value = '';

  // Save the updated entries to localStorage
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries.innerHTML));
}

// Function to delete a journal entry
function deleteJournalEntry(entryElement) {
  entryElement.parentElement.remove();

  // Save the updated entries to localStorage after deleting
  localStorage.setItem('journalEntries', JSON.stringify(journalEntries.innerHTML));
}

// Load journal entries when the page loads
loadJournalEntries();

showTask();
showTodo();
