const score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();

function reset() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

function playGame(playerMove) {
  playerMove = autoPickPlayerMove();
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  }

  if (result === "You Win") {
    score.wins++;
  } else if (result === "You Lose") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  }
  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  updateMovesElement(playerMove, computerMove);
  resultElement(result);
}

function updateScoreElement() {
  document.querySelector(
    ".js-score "
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
function updateMovesElement(playerMove, computerMove) {
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="images/${playerMove}.png" class="move-icon">
Computer <img src="images/${computerMove}.png" class="move-icon">
`;
}
function resultElement(result) {
  document.querySelector(".js-result").innerHTML = `${result}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }
  return computerMove;
}
function autoPickPlayerMove() {
  const randomNumber = Math.random();
  let playerMove = "";

  if (randomNumber >= 0 && randomNumber <= 1 / 3) {
    playerMove = "rock";
  } else if (randomNumber > 1 / 3 && randomNumber <= 2 / 3) {
    playerMove = "paper";
  } else {
    playerMove = "scissors";
  }
  // console.log(playerMove)
  return playerMove;
}

let intervalId; // Store interval ID globally

function autoPlay() {
  const autoPlayButtonElement = document.querySelector(".autoPlay-button");

  if (autoPlayButtonElement.innerText === "Auto Play") {
    autoPlayButtonElement.innerHTML = "Stop";
    autoPlayButtonElement.classList.add("is-autoPlay");

    // Start interval and store ID
    intervalId = setInterval(playGame, 2000);
  } else {
    autoPlayButtonElement.innerHTML = "Auto Play";
    autoPlayButtonElement.classList.remove("is-autoPlay");

    // Stop the interval
    clearInterval(intervalId);
  }
}
