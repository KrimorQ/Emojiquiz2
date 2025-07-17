// Master list of puzzles
const allPuzzles = [
  { emoji: '🦁👑', answer: 'The Lion King', category: 'Movie' },
  { emoji: '🧑\u200d🚀🌕', answer: 'First Man', category: 'Movie' },
  { emoji: '🏰🐉', answer: 'Game of Thrones', category: 'TV Show' },
  { emoji: '🧙\u200d♂️🧝\u200d♂️', answer: 'The Lord of the Rings', category: 'Book' },
  { emoji: '🎤👑', answer: 'Queen', category: 'Band' },
  { emoji: '🚢🧊', answer: 'Titanic', category: 'Movie' },
  { emoji: '🕹️👾', answer: 'Space Invaders', category: 'Game' },
  { emoji: '👻🔫', answer: 'Ghostbusters', category: 'Movie' },
  { emoji: '⚡️👦', answer: 'Harry Potter', category: 'Book' },
  { emoji: '🧟\u200d♂️🚶\u200d♂️', answer: 'The Walking Dead', category: 'TV Show' }
];

function dayOfYear(date = new Date()) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

// Get 5 puzzles based on the current day
function getDailyPuzzles() {
  const index = dayOfYear() % allPuzzles.length;
  const list = [];
  for (let i = 0; i < 5; i++) {
    list.push(allPuzzles[(index + i) % allPuzzles.length]);
  }
  return list;
}

// Track streak in localStorage
function loadStreak() {
  const data = JSON.parse(localStorage.getItem('streakData') || '{}');
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();
  let streak = 1;

  if (data.lastDate === today) {
    streak = data.streak || 1;
  } else if (data.lastDate === yesterday) {
    streak = (data.streak || 0) + 1;
  }

  localStorage.setItem('streakData', JSON.stringify({ lastDate: today, streak }));
  return streak;
}

const streak = loadStreak();
const puzzles = getDailyPuzzles();
const bonusHints = streak >= 3 ? 2 : 1;

let lives = 3;
let current = 0;
let hintsUsed = 0;

function updateLives() {
  document.getElementById('lives').textContent = 'Lives: ' + '❤'.repeat(lives);
}

function updateStreakDisplay() {
  document.getElementById('streak').textContent = 'Streak: ' + streak + ' day' + (streak === 1 ? '' : 's');
}

function updateHints() {
  const remaining = bonusHints - hintsUsed;
  document.getElementById('hints').textContent = 'Hints left: ' + remaining;
  document.getElementById('hint').disabled = remaining <= 0;
}

function showPuzzle() {
  document.getElementById('puzzle').textContent = puzzles[current].emoji;
  document.getElementById('guess').value = '';
  document.getElementById('message').textContent = '';
  hintsUsed = 0;
  updateHints();
}

function checkAnswer() {
  const guess = document.getElementById('guess').value.trim();
  if (guess.toLowerCase() === puzzles[current].answer.toLowerCase()) {
    current++;
    if (current >= puzzles.length) {
      document.getElementById('message').textContent = 'You win!';
      document.getElementById('submit').disabled = true;
      document.getElementById('hint').disabled = true;
    } else {
      showPuzzle();
    }
  } else {
    lives--;
    updateLives();
    if (lives <= 0) {
      document.getElementById('message').textContent = 'Game over!';
      document.getElementById('submit').disabled = true;
      document.getElementById('hint').disabled = true;
    } else {
      document.getElementById('message').textContent = 'Try again!';
    }
  }
}

function showHint() {
  if (hintsUsed === 0) {
    document.getElementById('message').textContent = 'Category: ' + puzzles[current].category;
  } else if (hintsUsed === 1 && bonusHints > 1) {
    const first = puzzles[current].answer.trim()[0];
    document.getElementById('message').textContent = 'First letter: ' + first;
  }
  hintsUsed++;
  updateHints();
}

updateLives();
updateStreakDisplay();
showPuzzle();

document.getElementById('submit').addEventListener('click', checkAnswer);
document.getElementById('hint').addEventListener('click', showHint);
