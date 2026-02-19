"use strict";

// global variables 
let randomNum = 0;         // the game's secret random number they have to guess
let tries = 0;             // how many tries the user took to guess the random number
let bestScore = Infinity;  // the least amount of tries the user took to guess correctly in their playthrough

/**********************************************************************************************************************
* Updates the best score if the number of tries it took to guess correctly is less than the current best score
*
* @returns {void}
**********************************************************************************************************************/
const updateBestScore = () => {
    let bestScoreSpan = document.querySelector("#best_score");
    if (tries < bestScore) {
        bestScore = tries;
        bestScoreSpan.textContent = `Best Score: ${bestScore}`;
    }
}

/**********************************************************************************************************************
 * Generates a random integer number up to a given maximum number
 *
 * If no maximum number is supplied as an argument, set the maximum to 100 by default
 *
 * @param max the maximum number the function should generate
 *
 * @returns {Number}
 **********************************************************************************************************************/
const getRandomInt = (max = 100) => {
    let num = Math.random() * max;  // get a random number between 0 and max
    num = Math.ceil(num);           // round up to nearest integer
    console.log(`Random Number : ${num}`); // log to console to allow for easy debugging
    return num;
};

/**********************************************************************************************************************
 * Handles the logic to perform when the "Guess" button in clicked
 *
 * @returns {void}
 **********************************************************************************************************************/
const guessClick = () => {
    const guess = parseInt(document.querySelector("#number").value);// guess entered by user
    const guessInput = document.querySelector("#number");           // the user <input> element
    const messageLabel = document.querySelector("#message");        // the output message <label>
    const history = document.querySelector("#history");             // the history <span> element
    let message = "";                                                         // final output msg for user guess
    let color = "black";                                                      // the color of the output text

    /*******************************************************************************************************************
     * Helper function that updates the interface when the Guess() button is clicked
     *
     * @returns {void}
     ******************************************************************************************************************/
    const render = () => {
        messageLabel.textContent = message;
        messageLabel.style.color = color;
        guessInput.value = "";
        guessInput.focus();
    }

    /*
     * validate that the user entered a valid number that's in the appropriate value range
     * if invalid, set an appropriate error message and render the final screen for their invalid guess
     */
    if (isNaN(guess)) {
        message = "Not a valid number. Please enter a valid number."
        return render();
    } else if (guess < 1 || guess > 100) {
        message = "Invalid number. Enter a number between 1 and 100.";
        return render();
    }

    // calculate the user's distance from the random number and increment their tries count
    const distance = Math.abs(randomNum - guess);
    tries ++;

    // check whether the user guessed correctly or how close their guess was. Perform hot/cold logic accordingly
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
        default:
            message = "An unknown error occurred.";
    }//end switch

    // append the user's guess to their game history
    history.innerHTML += `Guess ${tries}: ${guess} - ${message}<br>`;

    // after processing the user's guess, render the final resulting screen
    render();
};

/**********************************************************************************************************************
 * Handles the logic to perform when the "Play Again" button is clicked
 *
 * @returns {void}
 **********************************************************************************************************************/
const playAgainClick = () => {
    randomNum = getRandomInt(100);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = "";
    document.querySelector("#history").innerHTML = "";
};

// add event listeners when the DOM is fully loaded for the "Guess" button, "Play Again" button, and "Enter" key press
document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    // tie button click events to appropriate functions
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