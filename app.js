/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. 
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
-3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, topScore;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if(gamePlaying) {
		var dice = Math.floor(Math.random() * 6) + 1;
		var diceDOM = document.querySelector('.dice');
		diceDOM.style.display = 'block';
		diceDOM.src = 'dice-' + dice + '.png';
		if(dice !== 1) {
			//add score
			roundScore += dice;
			document.querySelector('#current-' + activePlayer).textContent = roundScore;
			if(prevRoll === 6 && dice === 6) {
				//Player loses entire score
				scores[activePlayer] = 0;
				document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
				roundScore = 0;
				prevRoll = 0;
				nextPlayer();
			}
			else {
				prevRoll = dice;
			}
		} else {
			nextPlayer();
		}
	}
});

document.querySelector('.btn-hold').addEventListener('click', function() {
	if(gamePlaying){
		//Add current score to global score
		scores[activePlayer] += roundScore;
		//update UI 
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		
		//check to see if player won the game
		if(scores[activePlayer] >= topScore){
			document.querySelector('#name-' + activePlayer).textContent = "Winner!";
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
			document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
			gamePlaying = false;

		} else {
			nextPlayer();
		}
	}
});


const nextPlayer = () => {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
		roundScore = 0;
		prevRoll = 0;
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;

		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');
		//document.querySelector('.player-0-panel').classList.remove('active');
		//document.querySelector('.player-1-panel').classList.add('active');
		document.querySelector('.dice').style.display = 'none';
		
}

document.querySelector('.btn-new').addEventListener('click', init);
document.querySelector('.btn-submit').addEventListener('click', function() {
	var a = document.getElementById("newscore").value;
	a = Number(a);
	if(a > 0){
		topScore = a;
		document.getElementById('winning-score').textContent = topScore;
		document.getElementById("newscore").value = '';
	}
});


function init()  {
	scores= [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;
	prevRoll = 0;
	topScore = 20;
	document.querySelector('.dice').style.display = 'none';
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = "Player 1";
	document.getElementById('name-1').textContent = "Player 2";
	document.getElementById('winning-score').textContent = topScore;
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
	document.getElementById("newscore").value = '';

}