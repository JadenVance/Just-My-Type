$(document).ready(function () {
    const sentences = ['bruh the door aint shut my guy'];
    let sentenceIndex = 0, 
        currentSentence = sentences[sentenceIndex],
        letterIndex = 0,
        currentLetter = currentSentence[letterIndex],
        highlighterPosition = 15,
        numofMistakes = 0,
        startTime = null, 
        gameOn = false

    $("#keyboard-upper-container").hide();
    $("#sentence").append(currentSentence);
    $("#target-letter").append(currentLetter);

    $(document).keydown(function (e) {
        if (e.key.charCodeAt(0) === 83) {
            $("#keyboard-lower-container").hide();
            $("#keyboard-upper-container").show();
        }

        if (!gameOn) {
            gameOn = !gameOn;
            startTime = Date.now();
        }

        $(`#${e.key.charCodeAt(0)}`).css("background-color", "yellow");

        if (e.key === currentLetter) {
            letterIndex++;
            currentLetter = currentSentence[letterIndex];
            $("#target-letter").empty();
            $("#yellow-block").css("left", (highlighterPosition += 18) + "px");
            $("#feedback").append("<span class='glyphicon glyphicon-ok'></span>");

            if (currentLetter === " ") {
                $("#target-letter").append("Space");
            } else {
                $("#target-letter").append(currentLetter);
            }

            if (letterIndex === currentSentence.length) {
                letterIndex = 0;
                sentenceIndex++;
                currentSentence = sentences[sentenceIndex];

                if (currentSentence === undefined) {
                    let endTime = Date.now();
                    let time = endTime - startTime;
                    time = time / 1000 / 60;
                    calcWordsPerMinute(time, numofMistakes);
                    $("#prompt-container").append("<button onClick='location.reload()' class='btn btn-primary' type='button'>Reset?</button>")
                } else {
                    currentLetter = currentSentence[letterIndex];
                    highlighterPosition = 15; 
                    $("#yellow-block").css("left", highlighterPosition = "px");
                    $("#feedback").empty();
                    $("#sentence").empty();
                    $("#sentence").append(currentSentence);
                    $("#target-letter").append(currentLetter);
                }
            }
        } else {
            if (e.key !== "Shift") {
                numofMistakes++
                $("#feedback").append("<span class='glyphicon glyphicon-remove'><?span>");
            }
        }
    });

    $(document).keyup(function (e) {
        $("#keyboard-upper-container").hide();
        $("#keyboard-lower-container").show();

        $(`#${e.key.charCodeAt(0)}`).css("backgrund-color", "#f5f5f5")
    });
});
    

function calcWordsPerMinute(minutes, numberofMistakes) {
    alert(Math.floor(54 / minutes - 2 * numberofMistakes));
}

    

function resetGame() {
        sentenceIndex = 0
        currentSentence = sentences[sentenceIndex]
        letterIndex = 0 
        currentLetter = currentSentence[letterIndex]
        highlighterPosition = 15
        numofMistakes = 0
        startTime = null
        gameOn = false
        $("#feedback").empty();
        $("#sentence").empty();
        $("#sentence").append(currentSentence);
        $("#target-letter").append(currentLetter);
    }
