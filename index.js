// Variables initialization //
var level = 0;
var keypress = 0;
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var clicks = 0;

//Setting the document to start heading//

$("#level-title").text("Press A Key to Start");

//next sequence funcytion//

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour)
        .fadeOut(100)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("#level-title").text("Level " + level);
}

$(".btn").click(function (event) {
    clicks += 1;
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    if (clicks == level) {
        playGame();
        clicks = 0;
        userClickedPattern = [];
    }
});

$(document).keypress(function (event) {
    keypress += 1;
    if (keypress == 1) {
        nextSequence();
        $("#level-title").text("Level 0");
        userClickedPattern = [];
        clicks = 0;
    }
});

function playGame() {
    if (JSON.stringify(userClickedPattern) == JSON.stringify(gamePattern)) {
        nextSequence();
    } else if (
        JSON.stringify(userClickedPattern) != JSON.stringify(gamePattern)
    ) {
        playSound("wrong");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        gameOver();
    }
}

function gameOver() {
    level = 0;
    gamePattern = [];
    keypress = 0;
    userClickedPattern = [];
    clicks = 0;
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("." + currentColour).addClass("pressed");
    setTimeout(function () {
        $("." + currentColour).removeClass("pressed");
    }, 100);
}