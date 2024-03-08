document.addEventListener("DOMContentLoaded", function() { //DOMContentLoaded Event
  const board = document.getElementById("board");
  const status = document.getElementById("status");
  const restartBtn = document.getElementById("restart-btn");

  const ROWS = 6;
  const COLS = 7;
  let currentPlayer = 1; // Player 1 starts
  let grid = createGrid();
  let gameOver = false;

  const audio = new Audio('music.mp3');

  // Create the game board grid
  function createGrid() {
    let grid = [];
    for (let i = 0; i < ROWS; i++) {
      let row = [];
      for (let j = 0; j < COLS; j++) {
        row.push(0); // 0 represents an empty cell
      }
      grid.push(row);
    }
    return grid;
  }

  // Render the game board
  function render() {
    board.innerHTML = "";
    grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.dataset.row = rowIndex;
        cellDiv.dataset.col = colIndex;
        
        // Check if the cell has a disc
        if (cell === 1) {
          cellDiv.classList.add("player-one");
        } else if (cell === 2) {
          cellDiv.classList.add("player-two");
        }
        
        board.appendChild(cellDiv);
      });
    });
  }

  
  // Check for win conditions
  function checkWin(row, col) {
    // Check horizontally
    for (let c = 0; c <= COLS - 4; c++) {
      if (
        grid[row][c] === currentPlayer &&
        grid[row][c + 1] === currentPlayer &&
        grid[row][c + 2] === currentPlayer &&
        grid[row][c + 3] === currentPlayer
      ) {
        return true;
      }
    }
    // Check vertically
    for (let r = 0; r <= ROWS - 4; r++) {
      if (
        grid[r][col] === currentPlayer &&
        grid[r + 1][col] === currentPlayer &&
        grid[r + 2][col] === currentPlayer &&
        grid[r + 3][col] === currentPlayer
      ) {
        return true;
      }
    }
    // Check diagonally (down-right)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = 0; c <= COLS - 4; c++) {
        if (
          grid[r][c] === currentPlayer &&
          grid[r + 1][c + 1] === currentPlayer &&
          grid[r + 2][c + 2] === currentPlayer &&
          grid[r + 3][c + 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
    // Check diagonally (down-left)
    for (let r = 0; r <= ROWS - 4; r++) {
      for (let c = COLS - 1; c >= 3; c--) {
        if (
          grid[r][c] === currentPlayer &&
          grid[r + 1][c - 1] === currentPlayer &&
          grid[r + 2][c - 2] === currentPlayer &&
          grid[r + 3][c - 3] === currentPlayer
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Handle player move
  function dropDisc(col) {
    if (gameOver) return; // Game is already over
    for (let row = ROWS - 1; row >= 0; row--) {
      if (grid[row][col] === 0) {
        grid[row][col] = currentPlayer;
        render();

  // Animation class
  const droppedPiece = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  droppedPiece.classList.add(currentPlayer === 1 ? "drop-player-one" : "drop-player-two");
// Remove animation 
    setTimeout(() => {
    droppedPiece.classList.remove(currentPlayer === 1 ? "drop-player-one" : "drop-player-two");
    }, 500); 
   
    // Checking win condition
        if (checkWin(row, col)) {
          status.textContent = `Player ${currentPlayer} wins!`;
          gameOver = true;
        if(status.textContent === `Player 1 wins!`)
            {triggerRedDiscoLights(1000);
              audio.play();
            }
        else if(status.textContent === `Player 2 wins!`)    
              {triggerYellowDiscoLights(1000);
                audio.play();
              }
          
          setTimeout(() => {
            if (confirm("Player " + currentPlayer + " wins! Click OK to restart.")) {
              window.location.reload(); // reload event
            }
          }, 100);
          return;
        }else if (isDraw()) {
          status.textContent = "It's a draw!";
          gameOver = true;
          setTimeout(() => {
            if (confirm("It's a draw! Click OK to restart.")) {
              window.location.reload(); // relaod event
            }
          }, 100);
          return;
        }
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        status.textContent = `Player ${currentPlayer}'s turn`;
        return;
      }
    }
  }

  // Checking for draw condition
function isDraw() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (grid[row][col] === 0) {
        return false; // Found an empty cell, game is not a draw
      }
    }
  }
  return true; // All cells are filled, game is a draw
}

  // Event listener for player moves
  board.addEventListener("click", function(e) {  //click event
    const col = parseInt(e.target.dataset.col);
    if (!isNaN(col)) {
      dropDisc(col);
    }
  });

  // Event listener for restarting the game
  restartBtn.addEventListener("click", function() {
    window.location.reload(); // Refresh the page
  });

  // Initial render
  render();
  status.textContent = "Player 1's turn";
});



// Function to trigger red disco lights for a duration
function triggerRedDiscoLights(duration) {
  var discoLights = document.getElementById('disco-lights');
  discoLights.classList.add('red-disco');
  discoLights.style.display = 'block';
  setTimeout(function() {
    discoLights.classList.remove('red-disco');
    discoLights.style.display = 'none';
  }, duration); 
}

// Function to trigger yellow disco lights for a duration
function triggerYellowDiscoLights(duration) {
  var discoLights = document.getElementById('disco-lights');
  discoLights.classList.add('yellow-disco');
  discoLights.style.display = 'block';
  setTimeout(function() {
    discoLights.classList.remove('yellow-disco');
    discoLights.style.display = 'none';
  }, duration); 
}