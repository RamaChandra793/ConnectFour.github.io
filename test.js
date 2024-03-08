document.addEventListener("DOMContentLoaded", function() {
    const board = document.getElementById("board");
    const status = document.getElementById("status");
    const restartBtn = document.getElementById("restart-btn");
  
    const ROWS = 6;
    const COLS = 7;
    let currentPlayer = 1; // Player 1 starts
    let currentColumn = 0; // Initialize current column for disc placement
    let grid = createGrid();
    let gameOver = false;
  
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
    function dropDisc() {
      if (gameOver) return; // Game is already over
      for (let row = ROWS - 1; row >= 0; row--) {
        if (grid[row][currentColumn] === 0) {
          grid[row][currentColumn] = currentPlayer;
          render();
          if (checkWin(row, currentColumn)) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameOver = true;
            setTimeout(() => {
              if (confirm("Player " + currentPlayer + " wins! Click OK to restart.")) {
                window.location.reload(); // Refresh the page
              }
            }, 100);
            return;
          } else if (isDraw()) {
            status.textContent = "It's a draw!";
            gameOver = true;
            setTimeout(() => {
              if (confirm("It's a draw! Click OK to restart.")) {
                window.location.reload(); // Refresh the page
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
  
    // Event listener for player moves using arrow keys
    document.addEventListener("keydown", function(e) {
      if (!gameOver) {
        if (e.key === "ArrowLeft" && currentColumn > 0) {
          currentColumn--;
          render();
        } else if (e.key === "ArrowRight" && currentColumn < COLS - 1) {
          currentColumn++;
          render();
        } else if (e.key === "ArrowDown") {
          dropDisc();
        }
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
  