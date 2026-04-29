# Hot or Cold Game
![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/CSS-3-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![License](https://img.shields.io/badge/License-MIT-green)


## Author
[@bstearns07](https://github.com/bstearns07) Ben Stearns

📅 **Last Updated:** 3/3/2026

## Table of Contents
- 📌 [Summary](#-summary)
- ⭐ [How It Works](#-how-it-works)
- 🚀 [Live Demo](#-live-demo)
- ✨ [Features](#-features)
- 🧰 [Tech Stack](#-tech-stack)
- 🔧 [Development Tools](#-development-tools)
- 🧩 [Core Concepts](#-core-concepts)
- 📝 [New Topics Covered](#-new-topics-covered)
- 📘 [What I Learned](#-what-i-learned)
- 🖼 [Screenshots](#-screenshots)

## 📌 Summary
### Welcome to the Hot or Cold Game
This JavaScript web app is a number guessing game. Try and guess the secret random number the game generates. 
This little game will let you know if you're so close that you're on fire🔥, or so far off that you're
freezing cold❄️. Give it a try!<br>
<br>
For full program details, please see [Program Requirements](./assets/Assignment_Instructions.pdf)

## ⭐ How It Works
Simply open index.html to begin.<br>
<br>
Instructions:
- Type a number in the entry box that's within the range displayed (default is between 1-100)
- Click "Guess" or press "Enter" to submit your guess
- The game will tell you if you're hot or cold plus how close you are
- Keep guessing until you get it right. The game will track your guess history to help
- Click "Play Again" at any time to start a new game with a new random number
- If you'd like to make the game easier/harder, just enter a number and click "Update Max". This adjusts the maximum number 
  the game should generate to what you specified (not available in the middle of a game)
- Play as long as you like! The game will keep track of your high score

---

## 🚀 Live Demo
> ⬇️ **Click the link below to open the app in your browser and try it yourself!**⬇️

👉 [![Open Demo](https://img.shields.io/badge/▶%20Open%20Live%20Demo-ff4b4b?style=for-the-badge)](https://bstearns07.github.io/HotColdGame/)

---

## ✨ Features
Features of this game include:
- Random number generation
- Play Again and Update Maximum number buttons
- Game output display to confirm user actions
- Game History display
- Tracks your best score
- Numeric Data Validation
- Tailwind CSS and responsive design

---

## 🧰 Tech Stack
JavaScript (ES6)
HTML (DOM interaction)

---

## 🔧 Development Tools
Visual Studio Code
Web Browser (Chrome, Edge, etc.)
Git & GitHub

---

## 🧩 Core Concepts
- Random Number Generation
- Input/Range validation
- CSS manipulation
- Button click event handlers
- Enable/Disable DOM elements
- Tracking game data

## 📝 New Topics Covered
- DOM manipulation
- Defining functions
- Adding event listeners
- switch(true) statements
- "keydown" event listeners and element.focus() for improved user experience
- Enabling/disabling buttons
- Tailwind responsive design and animations

---

## 📘 What I Learned
This program taught us really starting to script the DOM. Up till now I've really only cached DOM elements and got their values. Now I learned more advanced techniques like using element.innerHtml() to maniputle the html content in side a container element and element.style.color to update color css styling for an element. I also learned how Math.random and Math.celing can be used together to create random integer numbers. I also spent some extra time on this one to add extra features like letting the user update their max number to make the game as challenging as they'd like.

## 🖼 Screenshots

### Default State
![hot-or-cold-game](assets/intro.png)

### Valid Entry
![Valid Entry](assets/valid.png)
![Valid Entry](assets/valid2.png)

### Invalid Entry
![Valid Entry](assets/invalid.png)
![Valid Entry](assets/invalid4.png)
![Valid Entry](assets/invalid2.png)
![Valid Entry](assets/invalid3.png)

[Back to Top](#hot-or-cold-game)
