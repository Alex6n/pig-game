'use strict';

let turn, basket, playerA, playerB;
const until = 100;

const main = document.querySelector('.main');
const rollButton = document.querySelector('.btn--roll');
const holdButton = document.querySelector('.btn--hold');
const resetButton = document.querySelector('.btn--new');
const diceImage = document.querySelector('.dice');

const barA = document.querySelector('.player--0');
const currentA = document.querySelector('#current--0');
const pointsA = document.querySelector('#score--0');

const barB = document.querySelector('.player--1');
const currentB = document.querySelector('#current--1');
const pointsB = document.querySelector('#score--1');

function startOver() {
  turn = true;
  basket = 0;
  playerA = 0;
  playerB = 0;
  pointsA.textContent = 0;
  pointsB.textContent = 0;
  currentA.textContent = 0;
  currentB.textContent = 0;
  barA.classList.add('player--active'), barB.classList.remove('player--active');
  barA.classList.remove('player--winner'),
    barB.classList.remove('player--winner');
  diceImage.style.visibility = 'hidden';
}
startOver();

function nextTurn() {
  if (playerA >= until || playerB >= until) return;
  basket = 0;
  turn ? (currentA.textContent = 0) : (currentB.textContent = 0);
  !turn
    ? (barA.classList.add('player--active'),
      barB.classList.remove('player--active'))
    : (barB.classList.add('player--active'),
      barA.classList.remove('player--active'));
  turn = !turn;
}

function diceRoll() {
  if (playerA >= until || playerB >= until) return;
  let dice = Math.floor(Math.random() * 6) + 1;
  if (diceImage.style.visibility == 'hidden')
    diceImage.style.visibility = 'visible';
  diceImage.src = `dice-${dice}.png`;
  if (turn) {
    dice != 1
      ? ((currentA.textContent = Number(currentA.textContent) + dice),
        (basket += dice))
      : ((currentA.textContent = 0), nextTurn());
  } else {
    dice != 1
      ? ((currentB.textContent = Number(currentB.textContent) + dice),
        (basket += dice))
      : ((currentB.textContent = 0), nextTurn());
  }
}

function holdDice() {
  if (playerA >= until || playerB >= until) return;
  turn ? (playerA += basket) : (playerB += basket);
  pointsA.textContent = playerA;
  pointsB.textContent = playerB;
  if (turn) {
    playerA >= until
      ? (barA.classList.add('player--winner'),
        (diceImage.style.visibility = 'hidden'))
      : nextTurn();
  } else {
    playerB >= until
      ? (barB.classList.add('player--winner'),
        (diceImage.style.visibility = 'hidden'))
      : nextTurn();
  }
}

rollButton.addEventListener('click', diceRoll);
holdButton.addEventListener('click', holdDice);
resetButton.addEventListener('click', startOver);
