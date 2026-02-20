/**********************************************************************************************************************
 * Program............: Hot and Cold Game
 * Programmers........: Ben Stearns
 * Date...............: 2-21-26
 * GitHub Repo........: https://github.com/bstearns07/HotColdGame
 * Description........: A number-guessing JavaScript web application. Features include:
 *                          - Random number generation for the secret number to guess
 *                          - Data Validation for numeric entries
 *                          - Custom functions and event listeners for button clicks
 *                          - DOM manipulation
 *                          - Play Again, Best Score, Game Output, and Game History feature
 *                          * Tailwind styling and responsive design
 *                          * Buttons that will enable/disable as appropriate
 *                          * Allows the user to update their maximum range of numbers to generate
 * File Description...: defines all the logic for the game
 **********************************************************************************************************************/

"use strict";

// global variables 
let randomNum = 0;         // the game's secret random number they have to guess
let tries = 0;             // how many tries the user took to guess the random number
let bestScore = Infinity;  // the least amount of tries the user took to guess correctly in their playthrough
let max = 100;             // the maximum number the game should generate

/**********************************************************************************************************************
* Updates the user's best score on display if (tries before guessing correctly) < (current best score)
*
* @returns {void}
**********************************************************************************************************************/
const updateBestScore = () => {
    if (tries < bestScore) {
        bestScore = tries;
        document.querySelector("#best_score").textContent = `${bestScore}`;
    }
}

/**********************************************************************************************************************
 * Updates the maximum number the game randomly generates
 *
 * @returns {void}
 **********************************************************************************************************************/
const updateMaxNum = () => {
    const num = parseInt(document.querySelector("#number").value);
    const messageLabel = document.querySelector("#message");
    messageLabel.style.color = "black";

    if (isNaN(num))
        messageLabel.textContent = "Invalid entry. Please enter a number to update the game's max number.";
    else{
        max = num;
        messageLabel.textContent = "Maximum number successfully updated";
        playAgainClick("Maximum number successfully updated");
    }
}

/**********************************************************************************************************************
 * Generates a random whole number up to a given maximum number
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
 * Handles the logic to perform when the "Guess" button is clicked
 *
 * @returns {void}
 **********************************************************************************************************************/
const guessClick = () => {
    // function variables
    const guess = parseInt(document.querySelector("#number").value);// the guess entered by user
    const guessInput = document.querySelector("#number");           // the user <input> element
    const messageLabel = document.querySelector("#message");        // the output message <label>
    const history = document.querySelector("#history");             // the history <span> element
    const guessBtn = document.querySelector("#guess");              // guess button element
    let message = "";                                                         // final output msg for user guess
    let color = "black";                                                      // the color the output text should be

    /*******************************************************************************************************************
     * Helper function that renders the interface when the Guess() button is clicked
     *
     * @returns {void}
     ******************************************************************************************************************/
    const render = () => {
        // display the final output message, set the msg color, reset the user input field, and shift cursor focus back
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
    } else if (guess < 1 || guess > max) {
        message = "Invalid number. Enter a number between 1 and 100.";
        return render();
    }

    // calculate the user's distance from the random number, increment their tries count, and disable Update Max btn
    const distance = Math.abs(randomNum - guess);
    tries ++;
    document.querySelector("#update-max").disabled = true;

    /*
    * check whether the user guessed correctly or how close their guess was. Perform hot/cold logic accordingly by
    * building an appropriate response message, setting output text color, and updating best score as needed
    */
    switch (true){
        case (distance === 0):
            const lastWord = (tries ===1) ? "try" : "tries";
            message = `Fire! You guessed it in ${tries} ${lastWord}`;
            color = "green";
            updateBestScore();
            guessBtn.disabled = true; //disable Guess button until Play Again is clicked
            document.querySelector("#update-max").disabled = false; //re-enable Update Max button
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

    // render the final resulting screen
    render();
};

/**********************************************************************************************************************
 * Handles the logic performed when the "Play Again" button is clicked
 *
 * Resets try attempts to 0, clears interface, and disables/re-enables buttons as needed
 *
 * @param msg An optional message to display in the game's output. Empty string by default
 *
 * @returns {void}
 **********************************************************************************************************************/
const playAgainClick = (msg = "") => {
    randomNum = getRandomInt(max);
    tries = 0;
    document.querySelector("#number").value = "";
    document.querySelector("#message").textContent = `${msg}`;
    document.querySelector("#history").innerHTML = "";
    document.querySelector("#guess").disabled = false; //re-enable the guess button
    document.querySelector("#update-max").disabled = false;// diable the Update Max button
    document.querySelector("#range").textContent = `It's from 1 to ${max}`;
};

/**********************************************************************************************************************
 * DOMContentLoaded() event listeners
 **********************************************************************************************************************/
document.addEventListener("DOMContentLoaded", () => {
    playAgainClick(); // initial a new game

    // tie button click events to appropriate functions
    document.querySelector("#guess").addEventListener(
        "click", guessClick);
    // updated Play Again listener to ignore the event passed to playAgainClick() so an optional string msg can be passed to it
    document.querySelector("#play_again").addEventListener(
        "click", () => playAgainClick());
    document.querySelector("#update-max").addEventListener(
        "click", updateMaxNum);

    // add an event listener that listens for when "enter" in pressed on the keyboard to trigger the "Guess" button
    document.querySelector("#number").addEventListener("keydown", (event) => {
        if (event.key === "Enter")
            guessClick();
    })

});