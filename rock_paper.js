const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

console.log("Rock - Paper - Scissors Game\n");
const choices = ["rock", "paper", "scissors"];

function getUserChoice() {
    return new Promise((resolve) => {
        rl.question("Enter your choice (rock, paper, scissors): ", (answer) => {
            resolve(answer.toLowerCase());
        });
    });
}

function getPlayAgain() {
    return new Promise((resolve) => {
        rl.question("Play again? (yes or y / no or any key): ", (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
}

async function playGame() {
    while (true) {
        let userChoice = await getUserChoice();
        if (!choices.includes(userChoice)) {
            console.log("Invalid choice! Choose one from (rock, paper, scissors).");
            continue;
        }

        let computerChoice = choices[Math.floor(Math.random() * choices.length)];
        console.log(`Computer chose: ${computerChoice}`);

        if (userChoice === computerChoice) {
            console.log("It's a tie!");
        } else if ((userChoice === "rock" && computerChoice === "scissors") ||
                   (userChoice === "paper" && computerChoice === "rock") ||
                   (userChoice === "scissors" && computerChoice === "paper")) {
            console.log("You win!");
        } else {
            console.log("You lose!");
        }

        let playAgain = await getPlayAgain();
        if (playAgain !== "yes" || playAgain !== "y") {
            console.log("Thanks for playing!");
            rl.close();
            break;
        }
    }
}

playGame();
