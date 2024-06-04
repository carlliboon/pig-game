'use strict';

const diceImage = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

let currentScore = 0;
let playerScores = [0, 0];
let currentPlayer = 0;

const diceElement = document.querySelector('.dice');

const playerElements = [
  {
    current: document.querySelector('#current--0'),
    score: document.querySelector('#score--0'),
  },
  {
    current: document.querySelector('#current--1'),
    score: document.querySelector('#score--1'),
  },
];

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

diceElement.style.display = 'none';

btnRoll.addEventListener('click', () => {
  const randomNumber = randomDiceNumber();
  diceElement.style.display = 'block';
  diceElement.src = diceImage[randomNumber - 1];

  if (randomNumber !== 1) {
    currentScore += randomNumber;
  } else {
    switchPlayer();
  }

  playerElements[currentPlayer].current.textContent = currentScore;
});

btnHold.addEventListener('click', () => {
  playerScores[currentPlayer] += currentScore;
  playerElements[currentPlayer].score.textContent = playerScores[currentPlayer];

  if (playerScores[currentPlayer] >= 100) {
    setWinner(currentPlayer);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

function randomDiceNumber() {
  return Math.floor(Math.random() * 6) + 1;
}

function switchPlayer() {
  currentScore = 0;
  playerElements[currentPlayer].current.textContent = currentScore;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.remove('player--active');
  currentPlayer = currentPlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${currentPlayer}`)
    .classList.add('player--active');
}

function setWinner(playerIndex) {
  document
    .querySelector(`.player--${playerIndex}`)
    .classList.add('player--winner');
  btnRoll.style.display = 'none';
  btnHold.style.display = 'none';
}

function init() {
  currentScore = 0;
  playerScores = [0, 0];
  currentPlayer = 0;

  playerElements.forEach((el, index) => {
    el.current.textContent = '0';
    el.score.textContent = '0';
    document
      .querySelector(`.player--${index}`)
      .classList.remove('player--winner');
  });

  diceElement.style.display = 'none';
  btnRoll.style.display = 'block';
  btnHold.style.display = 'block';
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
}

init();
