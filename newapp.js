'use-strict';
var startBtn = document.getElementById("startGame");
var resetBtn = document.getElementById("resetGame");
var scrInfo = document.getElementById("scoreInfo");
var pnltyInfo = document.getElementById("penaltyInfo");
var plyRemainder = document.getElementById("playRemainder");
var avrgScore = document.getElementById("averageScore");
var gmBrd = document.getElementById("gameBoard");
var clickMe = document.getElementById("clickMe");
var startTime, endTime, waitTime, gameStatus = false,
	 	plural, scoreEach, bundledScores = 0, countUp = 0, avrageScore = 0;
			// bundledScores must be set to a # so JavaScript knows what datatype to expect.
var playsRemain = 5;
var penalty = 0;

startBtn.onclick = startFunction;
clickMe.onclick = myFunctionHit;
gmBrd.addEventListener('click', penaltyFunction);

function startFunction() {
	resetBtn.addEventListener('click', resetFunction);
			// this must be inside this function (not before).
	resetBtn.textContent = 'Reset';
	resetBtn.style.backgroundColor = '#df574c';
	resetBtn.style.border = '1px solid #db4535';

	if (playsRemain === 0 || playsRemain <= 0) {
			// this is needed if the user completes the game, then presses the Start button,
				// & does not press the reset button.
			// playsRemain === 0 is redundant.
		scrInfo.innerHTML = 'Score Info&#58;';
		scoreEach = 0;
		pnltyInfo.innerHTML = 'Penalty Info&#58;';
		pnltyInfo.style.backgroundColor = '#ff0';
		penalty = 0;
		playsRemain = 5;// === (for comparison only) will not work but will not throw an error.
		plyRemainder.innerHTML = 'Play Remainder&#58; 5';
		countUp = 0;
		bundledScores = 0;
		avrageScore = 0;
		avrgScore.innerHTML = 'Average Score&#58';
	}

	if (!gameStatus) {// if gameStatus is false (the game is not active).
		waitTime = Math.random()*2000 + 700;// randomly stall the appearance of the click-square.
		gameStatus = true;

		mySetTimeout = setTimeout(function () {
			clickMe.style.display = 'block';
			var top = Math.random()*430;// random position values for the click-square.
			var left = Math.random()*630;
			startTime = Date.now();// start the timer.
			clickMe.style.top = top + 'px';// random positioning of the click-square.
			clickMe.style.left = left + 'px';
			clickMe.style.backgroundColor = '#' + Math.random().toString(16).substr(-6);
				// integer.toString(16); converts an integer into a Hexadecimal value.
					// 16 is necessary.
				// substr(-6); truncates the (above) Hexadecimal value down to 6 digits.
		}, waitTime);
	}
}

function penaltyFunction(e) {
	var myTagName = window.event.target.tagName;
				// get the name of the clicked-on HTML element tag.
	if (gameStatus && myTagName === 'DIV') {
				// both the background & click-square register the click, so === 'DIV' filters.
		penalty += 0.5;// this is the penalty value.
	} else {
		return false;
				// so, if the click-square is clicked, ignore this function.
	}
}

function myFunctionHit() {
	gameStatus = false;
	playsRemain -= 1;// this is a countdown.
	if (playsRemain === 1) { plural = 'play'; } else { plural = 'plays'; }
			// corrects the grammar.
	endTime = Date.now();// timestamp for when the click-square is clicked.
	this.style.display = 'none';// hide whatever is clicked on.
	scoreEach = (endTime - startTime)/1000 + penalty;
			// the /1000 must be before the penalty variable (concatenation verses addition).
	scrInfo.innerHTML = 'Previous time&#58; ' + scoreEach.toFixed(2);
			// .toFixed(2) truncates to two decimal places & converts a number into a string.
	pnltyInfo.innerHTML = 'Previous penalty&#58; ' + penalty.toFixed(1);
	if (penalty >0) {
		pnltyInfo.style.backgroundColor = '#faa';// red
	} else {
		pnltyInfo.style.backgroundColor = '#ff0';// yellow
	}
	plyRemainder.innerHTML = playsRemain.toFixed(0) + ' ' + plural + ' left.';
			// plural: corrects the grammar.
	if (playsRemain > 0) {
		startFunction();// this restarts the game once the square is clicked.
			// once playsRemain reaches zero, this function will not be triggered.
	}
	countUp += 1;// this is used as a dividing number for score averaging.
	bundledScores += scoreEach;// each score is sequentially added together.
	avrageScore = bundledScores / countUp;// this creates an average score.
	avrgScore.innerHTML = 'Average score&#58; ' + avrageScore.toFixed(2);
	penalty = 0;// reset the penalty's value to zero (for the next iteration).
}

function resetFunction() {
			// below, some redundancy is necessary to preempt any user action.
				// startFunction() contains many of the below statements.
	clearTimeout(mySetTimeout);
			// if the reset button is pressed while the click-square is not visible,
				// then, mySetTimeout is already running, so the game will not stop.
			// this stops startFunction from restarting (after the reset button is clicked).
	gameStatus = false;
	playsRemain = 5;
	clickMe.style.display = 'none';
	this.textContent = 'click the Start button';
	this.style.backgroundColor = '#999';
	this.style.border = '1px solid #555';
	scrInfo.innerHTML = 'Score Info&#58;';
	scoreEach = 0;
	pnltyInfo.innerHTML = 'Penalty Info&#58;';
	pnltyInfo.style.backgroundColor = '#ff0';
	penalty = 0;
	plyRemainder.innerHTML = 'Play Remainder&#58; 5';
	resetBtn.removeEventListener('click', resetFunction);
			// disable the reset button's functionality (one user click is the prerequisite).
	countUp = 0;
	bundledScores = 0;
	avrageScore = 0;
	avrgScore.innerHTML = 'Average Score&#58';
}