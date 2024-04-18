document.addEventListener("DOMContentLoaded", function () {
  const holes = document.querySelectorAll(".hole");
  const startButton = document.getElementById("startButton");
  const endButton = document.getElementById("endButton");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");

  let timer;
  let score = 0;
  let countdown;
  let moleInterval;
  let milkInterval;

  // Set the initial state to game over
  let gameOver = true;

  function comeout() {
    holes.forEach((hole) => {
      hole.classList.remove("mole");
      hole.classList.remove("milk");
      hole.removeEventListener("click", handleMilkClick);
      hole.removeEventListener("click", handleMoleClick);
    });

    let randomMoleHole = holes[Math.floor(Math.random() * 9)];
    let randomMilkHole = holes[Math.floor(Math.random() * 9)];

    // Ensure that the mole and milk holes are different
    while (randomMilkHole === randomMoleHole) {
      randomMilkHole = holes[Math.floor(Math.random() * 9)];
    }

    randomMoleHole.classList.add("mole");
    randomMilkHole.classList.add("milk");

    randomMoleHole.addEventListener("click", handleMoleClick);
    randomMilkHole.addEventListener("click", handleMilkClick);
  }

  function handleMoleClick() {
    if (!gameOver) {
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }
    this.classList.remove("mole");
  }

  function handleMilkClick() {
    if (!gameOver) {
      score--;
      scoreDisplay.textContent = `Score: ${score}`;
    }
    this.classList.remove("milk");
  }

  function startGame() {
    if (!gameOver) {
      // Prevent starting the game
      // again if it's already in progress
      return;
    }

    gameOver = false;
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    timer = 60;
    timerDisplay.textContent = `Time: ${timer}s`;

    startButton.disabled = true;
    endButton.disabled = false;

    countdown = setInterval(() => {
      timer--;
      timerDisplay.textContent = `Time: ${timer}s`;

      if (timer <= 0) {
        clearInterval(countdown);
        gameOver = true;
        alert(`Game Over!\nYour final score: ${score}`);
        startButton.disabled = false;
        endButton.disabled = true;
      }
    }, 1000);

    moleInterval = setInterval(() => {
      if (!gameOver) comeout();
    }, 1000);
    milkInterval = setInterval(() => {
      if (!gameOver) comeout();
    }, 6000);

    console.log("Game started");
  }

  function endGame() {
    clearInterval(countdown);
    clearInterval(moleInterval);
    clearInterval(milkInterval); // Fixed typo here
    gameOver = true;
    alert(`Game Ended!\nYour final score: ${score}`);
    // Removed setting score and timer to 0 here
    startButton.disabled = false;
    endButton.disabled = true;
  }

  startButton.addEventListener("click", startGame);
  endButton.addEventListener("click", endGame);
});
