const puzzles = [
  { emoji: '🦁👑', answer: 'The Lion King', category: 'Movie' },
  { emoji: '🧑\u200d🚀🌕', answer: 'First Man', category: 'Movie' },
  { emoji: '🏰🐉', answer: 'Game of Thrones', category: 'TV Show' },
  { emoji: '🧙\u200d♂️🧝\u200d♂️', answer: 'The Lord of the Rings', category: 'Book' },
  { emoji: '🎤👑', answer: 'Queen', category: 'Band' }
];

let lives = 3;
let current = 0;

function updateLives() {
  document.getElementById('lives').textContent = 'Lives: ' + '❤'.repeat(lives);
}

function showPuzzle() {
  document.getElementById('puzzle').textContent = puzzles[current].emoji;
  document.getElementById('guess').value = '';
  document.getElementById('message').textContent = '';
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
  document.getElementById('message').textContent = 'Category: ' + puzzles[current].category;
}

updateLives();
showPuzzle();

document.getElementById('submit').addEventListener('click', checkAnswer);
document.getElementById('hint').addEventListener('click', showHint);
