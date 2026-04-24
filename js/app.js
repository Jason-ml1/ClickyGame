
  let score = 0;
let timeLeft = 5;
let gameStarted = false;
let gameEnded = false;
let interval = null;

// HTML DOM
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const scoreDisplay = document.getElementById('scoreDisplay');
const timerDisplay = document.getElementById('timerDisplay');
const label1 = document.getElementById('label1');
const input1 = document.getElementById('name');

// UI Functions & Events
button1.addEventListener('click', () => {
  if (!gameEnded) {
    increaseScore();
  }

  if (!gameStarted) {
    startGame();
  }
})

button2.addEventListener('click', () => {
  submitHighScore();
})

input1.style.display = 'none';
label1.style.display = 'none';
button2.style.display = 'none';

// Functions
function increaseScore() {
  score++;
  scoreDisplay.innerText = score;
}

function countdown() {
  timeLeft--;
  timerDisplay.innerText = timeLeft;

  if (timeLeft <= 0) {
    timerDisplay.innerText = 0;
    endGame();
  }
}

function startGame() {
  interval = setInterval(countdown,  1000);
  gameStarted = true;
}

function endGame() {
  gameEnded = true;
  clearInterval(interval);
  button1.style.display = 'none';
  input1.style.display = 'block';
  label1.style.display = 'block';
  button2.style.display = 'block';
}
async function submitHighScore() {
   // TODO: POST value to API from Ben.
   const response = await fetch("https://hooks.zapier.com/hooks/catch/8338993/ujs9jj9/", {
     method: "POST",
     body: JSON.stringify({name: input1.value, score: score}),
   });

   console.log(response);
  addScoreToTable(input1.value, score);
 }
  function addScoreToTable(name, score) {
    const table = document.getElementById("scoreTable").getElementsByTagName("tbody")[0];

    const newRow = table.insertRow();

    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.innerText = name;
    cell2.innerText = score;
  }
