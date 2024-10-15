const cells = document.querySelectorAll('.cell');
const restartBtn = document.getElementById('restartBtn');
const modal = document.getElementById('winModal');
const winnerMessage = document.getElementById('winnerMessage');
const winnerImage = document.getElementById('winnerImage');
const closeModalBtn = document.getElementById('closeModal');
const closeSpan = document.querySelector('.close-btn');
const statusDisplay = document.getElementById('status');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game
function startGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    isGameActive = true;
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');
        cell.textContent = '';
    });
    modal.style.display = 'none';
}

// Function to check if there is a winner
function checkWinner(player) {
    return winCombinations.some(combination => {
        return combination.every(index => board[index] === player);
    });
}

// Function to handle cell click
function handleCellClick(e) {
    const cell = e.target;
    const index = cell.getAttribute('data-index');

    if (board[index] !== '' || !isGameActive) return;

    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.textContent = currentPlayer;

    if (checkWinner(currentPlayer)) {
        isGameActive = false;
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        showWinModal(currentPlayer);
    } else if (!board.includes('')) {
        isGameActive = false;
        statusDisplay.textContent = "It's a draw!";
        showWinModal('Nobody');
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to show the modal with the winner
function showWinModal(winner) {
    if (winner === 'Nobody') {
        winnerMessage.textContent = `It's a draw!`;
        winnerImage.src = './draw.jpg'; // Replace with your draw image
    } else {
        winnerMessage.textContent = `${winner} wins the game!`;
        winnerImage.src = winner === 'X' ? './malupiton.gif' : 'path/to/o-wins-image.png'; // Replace with your X or O win image
    }
    modal.style.display = 'flex';
}

// Function to close modal and reset game
function closeModal() {
    modal.style.display = 'none';
    startGame();
}

// Event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', startGame);
closeModalBtn.addEventListener('click', closeModal);
closeSpan.addEventListener('click', closeModal);

// Optionally close modal by clicking outside of it
window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

// Initialize the game on load
startGame();
