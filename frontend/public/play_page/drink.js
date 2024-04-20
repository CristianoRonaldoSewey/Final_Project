document.addEventListener("DOMContentLoaded", function () {
  const holes = document.querySelectorAll(".hole");
  const startButton = document.getElementById("startButton");
  const endButton = document.getElementById("endButton");
  const scoreDisplay = document.getElementById("score");
  const timerDisplay = document.getElementById("timer");
  const gameContainer = document.getElementById("gameContainer"); // Check that this ID matches in the HTML

  let timer;
  let score = 0;
  let countdown;
  let moleInterval;
  let milkInterval;
  let wineInterval;
  let rushHourTimeout;
  let normalScoreCounter = 0; // Counter for points outside rush hour
  let isRushHour = false;
  let gameOver = true;

  function activateRushHour() {
    isRushHour = true;
    scoreDisplay.style.color = "red"; // Indicate rush hour with text color change
    gameContainer.classList.add("rush-blur"); // Apply blur effect to the game container

    rushHourTimeout = setTimeout(() => {
      isRushHour = false;
      scoreDisplay.style.color = "#333"; // Revert text color
      gameContainer.classList.remove("rush-blur"); // Remove blur effect
    
    }, 6000); // 6-second rush hour duration
  }

  function comeoutMole() {
    holes.forEach((hole) => {
      hole.classList.remove("mole");
      hole.removeEventListener("click", handleMoleClick); // Clear previous event listeners
    });

    const randomMoleHole = holes[Math.floor(Math.random() * holes.length)];
    randomMoleHole.classList.add("mole");
    randomMoleHole.addEventListener("click", handleMoleClick); // Re-add event listener
  }

  function comeoutMilk() {
    holes.forEach((hole) => {
      hole.classList.remove("milk");
      hole.removeEventListener("click", handleMilkClick); // Clear previous event listeners
    });

    const randomMilkHole = holes[Math.floor(Math.random() * holes.length)];
    randomMilkHole.classList.add("milk");
    randomMilkHole.addEventListener("click", handleMilkClick); // Re-add event listener
  }
  
  function comeoutWine() {
    holes.forEach((hole) => {
      hole.classList.remove("wine");
      hole.removeEventListener("click", handleWineClick); // Clear previous event listeners
    });

    const randomWineHole = holes[Math.floor(Math.random() * holes.length)];
    randomWineHole.classList.add("wine");
    randomWineHole.addEventListener("click", handleWineClick); // Re-add event listener
    // Remove the wine class after 1 second (1000 ms)
    setTimeout(() => {
      randomWineHole.classList.remove("wine");
      randomWineHole.removeEventListener("click", handleWineClick); // Ensure event listener is removed
    }, 1000); // 1 second
  }

  function handleMoleClick() {
    if (!gameOver) {
      const pointIncrement = isRushHour ? 2 : 1; // Double points during rush hour
      score += pointIncrement;
      scoreDisplay.textContent = `Score: ${score}`;

      if (!isRushHour) {
        normalScoreCounter += pointIncrement;

        if (normalScoreCounter >= 8) { // Activate rush hour when reaching 8 points
          normalScoreCounter = 0;
          activateRushHour(); // Start rush hour
        }
      }
    }
    this.classList.remove("mole");
  }

  function handleMilkClick() {
    if (!gameOver) {
      // If we're in rush hour, subtract two points; otherwise, subtract one
      const penalty = isRushHour ? 2 : 1;
      score -= penalty; // Decrement the score based on the current state
      scoreDisplay.textContent = `Score: ${score}`; // Update the score display

      this.classList.remove("milk"); // Remove the 'milk' class from the clicked element
    }
  }

  function handleWineClick() {
    if (!gameOver) {
      const pointIncrementW = isRushHour ? 6 : 3; // Double points during rush hour
      score += pointIncrementW;
      scoreDisplay.textContent = `Score: ${score}`;

      if (!isRushHour) {
        normalScoreCounter += pointIncrementW;

        if (normalScoreCounter >= 8) {
          // Activate rush hour when reaching 8 points
          normalScoreCounter = 0;
          activateRushHour(); // Start rush hour
        }
      }
    }
    this.classList.remove("wine");
  }

  function startGame() {
    if (!gameOver) {
      return; // Prevent starting if already in progress
    }
    if (rushHourTimeout) {
    clearTimeout(rushHourTimeout);
  }


    gameOver = false;
    score = 0;
    normalScoreCounter = 0; // Reset at the start
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
        startButton.disabled = false; // Enable the start button
        endButton.disabled = true;
      }
    }, 1000);

    moleInterval = setInterval(comeoutMole, 1000); // Mole appears every second
    milkInterval = setInterval(comeoutMilk, 3000); // Milk appears every 4 seconds
    wineInterval = setInterval(comeoutWine, 6000);
  }

  function endGame() {
    clearInterval(countdown);
    clearInterval(moleInterval);
    clearInterval(milkInterval); // Ensure all intervals are cleared
    clearInterval(wineInterval);
    clearTimeout(rushHourTimeout); // Clear rush hour timeout
    alert(`Game Ended!\nYour final score: ${score}`);
    startButton.disabled = false; // Enable the start button after game ends
    endButton.disabled = true  
  }

  startButton.addEventListener("click", startGame);
  endButton.addEventListener("click", endGame);
});