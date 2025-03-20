var randomColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).on("keypress", function() {
if (!started){
  nextSequence();
  $("#level-title").text("Level "+level);
  started = true;
}
})

$(".btn").on("click", function () {
var userChosenColour = $(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
})

function nextSequence() {
  userClickedPattern = [];
  level++;
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = randomColour[randomNumber]; 
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour)
}

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentPattern) {
  $("#"+currentPattern).addClass("pressed");
  setTimeout(() => {
  $("#"+currentPattern).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(() => {
        nextSequence();
        $("#level-title").text("Level "+level);
      }, 1000); 
    }
  }else{
    $("body").addClass("game-over");
    setTimeout(() => {
    $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game-Over, Press Any Key to Restart.")
    playSound("wrong");
    startOver();
  }
}

function startOver() {

started = false;
level = 0;
gamePattern= [];
}