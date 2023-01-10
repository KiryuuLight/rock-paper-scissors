let cpuWins = 0;

let plyrWins = 0;

let drawCnt = 0;

window.addEventListener('DOMContentLoaded', () => {
  console.log('Document ready');

  let timer;

  /* Select all items that we need */

  const btnStart = document.getElementById('btn-start');
  const btnMenu = document.getElementById('select-buttons');
  const estadistics = document.getElementById('estadistics');
  const cloudLeft = document.getElementById('election-left');
  const cloudRight = document.getElementById('election-right');
  const spriteLeft = document.getElementById('position-left');
  const spriteRight = document.getElementById('position-right');
  const cpu = document.getElementById('cpu');
  const player = document.getElementById('player');
  const draw = document.getElementById('draw');

  const startGame = function () {
    resetHTML();
    addElements();

    /* Change the animation between the elements and saves the reference
       to stop in the future.
    */

    timer = changeAnimation();
  };

  function addElements(msg) {
    if (msg) {
      estadistics.style.display = 'block';
      btnStart.style.display = 'flex';

      cloudLeft.style.display = 'none';
      cloudRight.style.display = 'none';
      btnMenu.style.display = 'none';
    } else {
      /* Hide these elements */
      estadistics.style.display = 'none';
      btnStart.style.display = 'none';

      /* Appear these elements */

      cloudLeft.style.display = 'flex';
      cloudRight.style.display = 'flex';
      btnMenu.style.display = 'flex';
    }
  }

  function playerHand(e) {
    btnMenu.style.display = 'none';

    let playerSelect = e.target.parentNode.id;

    let computerSelect = getRandomChoice();

    if (playerSelect === 'random') {
      playerSelect = getRandomChoice();
    }

    msg = playSingleRound(playerSelect, computerSelect);

    /* After the player selects an image, setTimeout will be triggered, 
    displaying the item selected by the player and the computer's choice.*/

    setTimeout(function () {
      spriteLeft.setAttribute('src', `img/${playerSelect}-sprite.png`);
      changeAnimation(timer);
      spriteRight.setAttribute('src', `img/${computerSelect}-sprite.png`);

      setTimeout(function () {
        addElements(true);
        displayMessageWinner();
        cpu.textContent = `${cpuWins}`;
        player.textContent = `${plyrWins}`;
        draw.textContent = `${drawCnt}`;
      }, 2000);
    }, 3000);
  }

  function changeAnimation(timer) {
    let images = [
      'img/scissors-sprite.png',
      'img/rock-sprite.png',
      'img/paper-sprite.png',
    ];

    let index = 0;

    if (timer) {
      clearInterval(timer);
    } else {
      timerID = setInterval(change, 100);
      return timerID;
    }

    function change() {
      spriteRight.setAttribute('src', images[index]);

      index > 1 ? (index = 0) : index++;
    }
  }

  function resetHTML() {
    spriteLeft.setAttribute('src', `img/random-sprite.png`);
    if (estadistics.childElementCount > 3) {
      estadistics.removeChild(estadistics.lastElementChild);
    }
  }

  function displayMessageWinner() {
    let divContainer = document.createElement('div');
    let winnerMsg = document.createElement('p');

    winnerMsg.textContent = `${msg}`;
    divContainer.appendChild(winnerMsg);
    estadistics.appendChild(divContainer);
  }

  btnStart.addEventListener('click', startGame);
  btnMenu.addEventListener('click', playerHand);
});

/* Game logic */

const array = ['rock', 'paper', 'scissors'];

function getRandomChoice() {
  // Math.random generate a value between 0 and 1 , then multiplies the length of
  // the array , and Math.floor approximates the nearest value

  let randomString = array[Math.floor(Math.random() * array.length)];

  return randomString;
}

function playSingleRound(playerSelection, computerSelection) {
  let msg = '';

  let pSelection = playerSelection;

  let cSelection = computerSelection;

  function decideWinner(p1, p2) {
    plyrWrMsg = 'Player wins!';
    cpuWrMsg = 'Computer wins!';
    drawMsg = "It's a draw";

    // Draw

    if (p1 === p2) {
      // msg = 'It\'\s a Draw' Another way to escape "'" character;
      msg = `${drawMsg}`;
      drawCnt++;
    }

    // Rock
    if (p1 == 'rock' && p2 == 'scissors') {
      msg = `${plyrWrMsg} Rock beats Scissors`;
      plyrWins++;
    } else if (p1 == 'rock' && p2 == 'paper') {
      msg = `${cpuWrMsg} Rock can't beat Paper`;
      cpuWins++;
    }

    // Paper

    if (p1 == 'paper' && p2 == 'rock') {
      msg = `${plyrWrMsg} Paper beats Rock`;
      plyrWins++;
    } else if (p1 == 'paper' && p2 == 'scissors') {
      msg = `${cpuWrMsg} Paper can't beat Scissors`;
      cpuWins++;
    }

    // Scissor

    if (p1 == 'scissors' && p2 == 'paper') {
      msg = `${plyrWrMsg} Scissors beats Paper`;
      plyrWins++;
    } else if (p1 == 'scissors' && p2 == 'rock') {
      msg = `${cpuWrMsg} Scissors can't beat Rock`;
      cpuWins++;
    }

    return msg;
  }

  decideWinner(pSelection, cSelection);

  return msg;
}
