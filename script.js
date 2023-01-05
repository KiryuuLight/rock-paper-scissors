/*Begin with a function called getComputerChoice that will randomly return either ‘Rock’, ‘Paper’ or ‘Scissors’. We’ll use this function in the game to make the computer’s play. Tip: use the console to make sure this is returning the expected output before moving to the next step! */

const array = ['Rock','Paper','Scissors'];

function getComputerChoice () {
    // Math.random generate a value between 0 and 1 , then multiplies the length of
    // the array , and Math.floor approximates the nearest value

    let randomString = array[Math.floor(Math.random() * array.length)];
    
    return randomString;
}

/*Write a function that plays a single round of Rock Paper Scissors. The function should take two parameters - the playerSelection and computerSelection - and then return a string that declares the winner of the round like so: "You Lose! Paper beats Rock"
Make your function’s playerSelection parameter case-insensitive (so users can input rock, ROCK, RocK or any other variation). */

function playSingleRound (playerSelection,computerSelection) {

    let msg = '';

    let cSelection = computerSelection.toLowerCase();

    let pSelection = playerSelection;

    // /* Value entered is validated. */ 

    // if (pSelection !== 'rock' && pSelection !== 'paper' && pSelection !== 'scissors') {
    //     msg = 'Not a valid value';
    // }

    /* Convert the values into numbers for comparison.  */
  
    function convertNumber(str) {
        if (str === 'rock') {
            return 2;
        } else if (str === 'paper') {
            return 1;
        } else if (str === 'scissors') {
            return 0;
        }
    }

    p1 = convertNumber(pSelection);
    p2 = convertNumber(cSelection);

    function decideWinner(p1,p2) {

        plyrWrMsg = 'Player wins!'
        cpuWrMsg = 'Computer wins!'
        drawMsg = 'It\'\s a draw';

        // Draw 

        if ((p1 == 0 && p2 == 0) && (p1 === p2)){
            // msg = 'It\'\s a Draw' Another way to escape "'" character; 
            msg = `${drawMsg}`;
        } else if ((p1 == 1 && p2 == 1) && (p1 === p2)) {
            msg = `${drawMsg}`;
        } else if ((p1 == 2 && p2 == 2) && (p1 === p2)) {
            msg = `${drawMsg}`;
        }
        
        // Rock
        if ((p1 == 2 && p2 == 0) && (p1 > p2)) {
            msg = `${plyrWrMsg} Rock beats Scissors`;
        } else if ((p1 == 2 && p2 == 1) && (p1 < (p2+2))) {
            msg = `${cpuWrMsg} Rock can't beat Paper`;
        } 

        // Paper

        if ((p1 == 1 && p2 == 2) && ((p1+2) > (p2))) {
            msg = `${plyrWrMsg} Paper beats Rock`;
        } else if ((p1 == 1 && p2 == 0) && (p1 < (p2+2))) {
            msg = `${cpuWrMsg} Paper can't beat Scissors`;
        } 

        // Scissor

        if ((p1 == 0 && p2 == 1) && ((p1+2) > (p2))) {
            msg = `${plyrWrMsg} Scissors beats Paper`;
        } else if ((p1 == 0 && p2 == 2) && (p1 < p2)) {
            msg = `${cpuWrMsg} Scissors can't beat Rock`;
        } 
        
        return msg;
    }

    decideWinner(p1,p2);

    return msg;
}


/*Write a NEW function called game(). Call the playRound function inside of this one to play a 5 round game that keeps score and reports a winner or loser at the end. */


function game(rounds) {

    let cpuWins = 0;

    let plyrWins = 0;

    let msg = '';

    let getMsgWnr = '';

    let winner = '';

    for (let i = 0; i < rounds; i++) {
        
        const getValueFromComputer = getComputerChoice();

        let inputPlayer = prompt('Pick a object').toLowerCase();

        if (inputPlayer !== 'rock' && inputPlayer !== 'paper' && inputPlayer !== 'scissors') {
            msg = 'Not a valid value';
            return msg;
        }
        msg =
        `--------------------ROUND N ${i+1}-----------------------------
        ----------------------------------------------------------------
                            You choose ${inputPlayer} 
        ----------------------------------------------------------------`;

        winner = playSingleRound(inputPlayer,getValueFromComputer);

        
        /*Count how many wins the CPU and Player have*/
        
        if (winner.indexOf('Player') === 0) {
            plyrWins += 1;
        } else if (winner.indexOf('Computer') === 0) {
            cpuWins += 1;
        }
 
        getMsgWnr += `

        ${msg} 

        ${winner}

        Player wins : ${plyrWins}

        Computer wins :  ${cpuWins}
        
        `; 
      
    }

    /* Decide Winner of N rounds */

    if (cpuWins > plyrWins) {

        getMsgWnr += `
        ********************************************
        *****************RESULTS********************
        *****************Cpu Wins*******************               
        ********************************************
        `;
    } else if (cpuWins < plyrWins) {
        getMsgWnr += `
        ********************************************
        *****************RESULTS********************
        ****************Player Wins*****************             
        ********************************************
        `;
    } else {
        getMsgWnr += `
        ********************************************
        *****************RESULTS********************
        *******************Draw*********************              
        ********************************************
        `;
    }


    return getMsgWnr;
}

console.log(game(5));


