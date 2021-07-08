const wordList = [
    "COMPUTER", 
    "PROGRAMMER",
    "WEB DEVELOPMENT",
    "JAVASCRIPT",
    "REACTJS FRAMEWORK",
    "PYTHON",
    "DJANGO FRAMEWORK",
    "JULIA",
    "GENIE FRAMEWORK",
    "CENTRAL PROCESSING UNIT",
    "RANDOM ACCESS MEMORY",
    "SOLID STATE DRIVE",
    "GRAPHICAL PROCESSING UNIT",
    "SWAP MEMORY",
    "FILE TRANSFER PROTOCOL",
    "JSON",
    "FRONT SIDE BUS",
    "FIRMWARE",
    "BIOS",
    "BOOTLOADER",
    "LINUX",
    "KERNEL",
    "UBUNTU",
    "WINDOWS",
    "XAMPP",
    "MYSQL",
    "BARE METAL HYPERVISOR",
    "HOSTED HYPERVISOR",
    "SAAS",
    "MICROSOFT AZURE",
    "C PLUS PLUS",
    "VISUAL STUDIO CODE",
    "VISUAL STUDIO",
    "PYCHARM",
    "JUNO",
    "COMPILER",
    "INTERPRETER",
    "ENCAPSULATION",
    "INHERITANCE",
    "ABSTRACTION",
    "POLYMORPHISM",
    "OBJECT ORIENTED PROGRAMMING",
    "FUNCTIONAL PROGRAMMMING",
    "CLASS",
    "OBJECT",
    "INTERFACE",
    "FRONTEND",
    "BACKEND",
    "WIREFRAME",
    "CASCADING STYLE SHEETS",
    "NODEJS",
    "MERN",
    "HASH",
    "C SHARP"
];

const picture = new Map();
picture.set(1, "rope");
picture.set(2, "head");
picture.set(3, "body");
picture.set(4, "right-hand");
picture.set(5, "left-hand");
picture.set(6, "right-leg");
picture.set(7, "left-leg");

let wordStatus = null, answer = "", maxWrong = 7, mistakes = 0, guessed = [];

function randomWord() {
    answer = wordList[Math.floor(Math.random() * wordList.length)];
}

function generateButtons() {
    let keyButtons = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter =>
        `
        <button
            class = "btn "
            id = '` + letter + `'
            onclick = "handleGuess('` + letter + `')"
        > ` + letter + `
        </button>
        `).join("");
    document.getElementById("keyboard").innerHTML = keyButtons;
}

function guessedWord() {
    wordStatus = answer.split('').map(letter =>
        (guessed.indexOf(letter) >= 0 ? letter : (letter !== " " ? " _ " : "&nbsp;&nbsp;&nbsp;"))).join('');
    document.getElementById("wordSpotlight").innerHTML = wordStatus;
    wordStatus = wordStatus.replaceAll("&nbsp;&nbsp;&nbsp;", " ");
}

function handleGuess(chosenLetter) {
    guessed.indexOf(chosenLetter) === - 1 ? guessed.push(chosenLetter) : null;
    document.getElementById(chosenLetter).setAttribute("disabled", true);
    if(answer.indexOf(chosenLetter) >= 0) {
        guessedWord();
        checkIfGameWon();
    }
    else if (answer.indexOf(chosenLetter) === -1) {
        ++mistakes;
        updateMistakes();
        checkIfGameLost();
        updateHangmanPicture();
    }
}

function updateMistakes() {
    document.getElementById("mistakes").innerHTML = mistakes;
}

function updateHangmanPicture() {
    let picId = picture.get(mistakes);
    document.getElementById(picId).classList.remove("hide");
}

function checkIfGameWon() {
    if (wordStatus === answer) {
        document.getElementById("keyboard").innerHTML = "You've won!"
        document.getElementById("keyboard").classList.add("won");
    }
}
function checkIfGameLost() {
    if (mistakes === maxWrong) {
        document.getElementById("wordSpotlight").innerHTML = "The answer was: " + answer;
        document.getElementById("keyboard").innerHTML = "You've lost!"
        document.getElementById("keyboard").classList.add("lost");
    }
}

function reset() {
    mistakes = 0;
    guessed = [];
    for (let value of picture.values()) {
        document.getElementById(value).classList.add("hide");
    }
    document.getElementById("keyboard").classList.remove("won");
    document.getElementById("keyboard").classList.remove("lost");
    randomWord();
    guessedWord();
    updateMistakes();
    generateButtons();
}

randomWord();
generateButtons();
guessedWord();