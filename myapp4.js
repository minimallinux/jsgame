'use-strict';
var starttime, endtime, waittime, gamestatus = false,
plural, scoreEach, bundledScores = 0, countUp = 0, avrageScore = 0;
// bundledScores must be set to a # so JavaScript knows what datatype to expect.
var playsRemain = 5;
var penalty = 0;
var startbtn = document.getElementById('startGame');
var clickme = document.getElementById('clickme');
var scoreinfo = document.getElementById('scoreInfo');
var resetBtn = document.getElementById("resetGame");
var scrInfo = document.getElementById("scoreInfo");
var pnltyInfo = document.getElementById("penaltyInfo");
var plyRemainder = document.getElementById("playRemainder");
var avrgScore = document.getElementById("averageScore");
var gmBrd = document.getElementById("gameboard");
clickme.onclick = myFunctionHit;
startbtn.onclick = myFunction;
gmBrd.addEventListener('click', penaltyFunction);
function myFunction() {
if(!gamestatus) {
waittime = Math.random()*2000+1000;
gamestatus = true;
setTimeout (function() {
var top = Math.random()*500;
var left = Math.random()*700;
starttime = Date.now();
clickme.style.backgroundColor='#'+Math.random().toString(16).substr(-6);
clickme.style.top=top+"px";
clickme.style.left=left+"px";
clickme.style.display="block";
},waittime);
}
}
function myFunctionHit() {
gamestatus = false;
endtime = Date.now();
this.style.display="none";
scoreInfo.innerHTML = (endtime - starttime)/1000 + ' was your time';
myFunction();
}

