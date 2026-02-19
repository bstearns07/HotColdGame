"use strict";

// global variables 
let randomNum = 0;  // the game's secret random number they have to guess
let tries = 0;      // how many tries the user took to guess the random number
let bestScore = 100;  // the least amount of tries the user took to guess correctly in their playthrough
let color = ""       // the color the output text should be

// updateBestScore() function
const updateBestScore = () => {
    let bestScoreSpan = document.querySelector("#best_score");
    if (tries < bestScore) {
        bestScore = tries;
        bestScoreSpan.textContent = `Best Score: ${bestScore}`;
    }
}

// helper function
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.ceil(num);           // round up to nearest integer
    console.log(`Random Number : ${num}`);
    return num;
};

// event handler functions
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);
    const guessInput = document.querySelector("#number");
    let messageLabel = document.querySelector("#message");
    let history = document.querySelector("#history");

    let message = "";
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number."
        color = "black";
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 10.";
        color = "black";
    }
    else{
        // determine the user's distance from the random number
        const distance = Math.abs(randomNum - guess);
        tries ++;

        // check whether the user guessed right or hold close their guess was. Perform logic accordingly
        switch (true){
            case (distance === 0):
                const lastWord = (tries ===1) ? "try" : "tries";
                message = `Fire! You guessed it in ${tries} ${lastWord}`;
                color = "green";
                updateBestScore();
                break;
            case (distance <= 5):
                message = "Hot! (Within 5)";
                color = "red";
                break;
            case (distance <= 10):
                message = "Warmer. (within 10)";
                color = "orangered";
                break;
            case (distance <= 20):
                message = "Warm. (within 20)";
                color = "orange";
                break;
            case (distance <= 30):
                message = "Cold. (within 30)";
                color = "lightblue";
                break;
            case (distance <= 40):
                message = "Colder. (within 40)";
                color = "blue";
                break;
            case (distance > 40):
                message = "FREEZING. (Way off)";
                color = "darkblue";
                break;
        }
        history.innerHTML += `Guess ${tries}: ${guess} - ${message}<br>`;
    }

    messageLabel.style.color = color;
    guessInput.value = "";
    guessInput.focus();
    document.querySelector("#message").textContent = message;
};

const playAgainClick = () => {
    randomNum = getRandomInt(100);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
    document.querySelector("#history").innerHTML = "";
};

document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    document.querySelector("#play_again").addEventListener(
        "click", playAgainClick);

    // add an event listener that listens for when "enter" in pressed on keyboard to trigger the "Guess" button
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter")
            guessClick();
    })
});