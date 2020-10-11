// Initialize global variables
var gameArr = [
    [],
    [],
    []
];
var movesArr = []
var movesCounter = 0;
var winnerExists = false;


// Allow the window to load before executing the scripts
window.addEventListener('load',
    function() {
        // Get the children of the board
        let board = document.getElementById('board').children;
        // Handle the gameplay
        addSquares(board);
        gameplay(board);
        initializeGame(board);
    }
);


/**
 * Assigns the square class to the children ofthe board
 * @param {HTMLCollection} boardChildren A collection of the child divs
 * for the board div
 */
function addSquares(boardChildren) {
    for (child in boardChildren) {
        boardChildren[child].className = 'square';
        boardChildren[child].innerHTML = '';
    }
}


/**
 * Initializes the game's state
 * @param {HTMLCollection} boardChildren A collection of the child divs
 * for the board div
 */
function initializeGame(boardChildren) {
    // Initialize the button
    let button = document.getElementsByClassName('btn')[0];
    button.addEventListener('click', function() {
        // Initializing Arrays and counter
        movesArr = [];
        gameArr = [
            [],
            [],
            []
        ];
        movesCounter = 0;
        winnerExists = false;
        // Initializing the board's squares
        addSquares(boardChildren);
        // Initializing the status bar
        let status = document.getElementById('status');
        status.classList.remove('you-won');
        status.innerHTML = "Move your mouse over a square and click to play an X or an O."
    });


}


/**
 * Places an X or an O in the specified div
 * @param {object} element The div the X or O is being placed in.
 * @param {string} move The respective move being played. Either X or O
 */
function placeMove(element, move) {
    if (validateMove(element, move) === false && winnerExists === false) {
        if (move === 'X') {
            element.className += " X";
            element.innerHTML = 'X';
        } else {
            element.className += " O";
            element.innerHTML = 'O';
        }
    }

}


/**
 * Checks if the game is a new game
 * @param {Array} gameArr The array that keeps track of the game's state.
 * @returns {boolean} true if the game is a new game and false otherwise.
 */
function isNewGame(gameArr) {
    // Iterate over outer array
    for (let arrIndex = 0; arrIndex < gameArr.length; arrIndex++) {
        let innerArr = gameArr[arrIndex];
        // Iterate over the inner array
        for (let innerIndex = 0; innerIndex < innerArr.length; innerIndex++) {
            // Check if all values are equal to null
            if (innerArr[innerIndex] !== null) {
                return false;
            }
        }
    }
    return true;
}

/**
 * Checks if the specified element already has a move placed into it
 * @param {object} element The element being checked
 * @returns {boolean} true if the element has a move in it and false otherwise
 */
function validateMove(element) {
    return element.classList.contains('X') || element.classList.contains('O');
}


/**
 * Places the respective move in the array that keeps track of the game's state
 * @param {Array} gameArr The array that keeps track of the game's state
 * @param {number} index The index of the div being selected
 * @param {string} move The respective move being played. Either X or O
 */
function placePlay(index, move) {
    switch (index) {
        case 0:
            gameArr[0][0] = move;
            break;
        case 1:
            gameArr[0][1] = move;
            break;
        case 2:
            gameArr[0][2] = move;
            break;
        case 3:
            gameArr[1][0] = move;
            break;
        case 4:
            gameArr[1][1] = move;
            break;
        case 5:
            gameArr[1][2] = move;
            break;
        case 6:
            gameArr[2][0] = move;
            break;
        case 7:
            gameArr[2][1] = move;
            break;
        case 8:
            gameArr[2][2] = move;
            break;

    }
}


/**
 * Handles the logic behind the initial play in the game
 * @param {object} element The div the X or O is being placed in.
 * @param {number} position The index of the div being selected
 * @returns {string} The first move of the game, either X or O
 */
function initialPlay(element, position) {
    let moves = ['X', 'O'];
    // Randomly select the first move
    let index = Math.floor(Math.random() * moves.length);
    let firstMove = moves[index];
    placeMove(element, firstMove)
    placePlay(position, firstMove);
    return firstMove;
}


/**
 * Gets the next move to be played
 * @returns {string} The next move to be played
 */
function getNextMove() {
    if (movesArr[movesCounter - 1] === 'X') {
        return 'O';
    } else {
        return 'X';
    }
}


/**
 *  Handles the logic of each move in the game.
 * @param {object} element The div the X or O is being placed in.
 * @param {number} position The index of the div being selected
 * @param {string} nextMove The next move to be played
 */
function gameMove(element, position, nextMove) {
    placeMove(element, nextMove);
    placePlay(position, nextMove)
}


/**
 * Adds event listeners to the specified div to toggle the 'hover' class from
 * the stylesheets.
 * @param {object} element The div being hovered over
 */
function hoverSquare(element) {
    element.addEventListener('mouseover', function() {
        element.classList.add('hover');
    });
    element.addEventListener('mouseout', function() {
        element.classList.remove('hover');
    });
}


/**
 * Check the game's state for a winner
 * @param {string} move The move being checked
 */
function checkState(move) {
    if (checkDiag(move) === true) {
        announceWinner(move);
        winnerExists = true;

    } else if (checkColumn(move) === true) {
        announceWinner(move);
        winnerExists = true;

    } else {
        for (let arrIndex = 0; arrIndex < gameArr.length; arrIndex++) {
            if (checkRow(gameArr[arrIndex], move) === true) {
                announceWinner(move);
                winnerExists = true;
            }
        }
    }
}


/**
 * Iterates through each row for the winning combination on the horizontal axis
 * @param {string} move The respective move, X or O
 * @returns {boolean} true if the entered move has a winning combination
 */
function checkRow(row, move) {
    if (row.length === 3) {
        for (let i = 0; i < row.length; i++) {
            if (row[i] !== move) {
                return false;
            }
        }
        return true;
    }
}


/**
 * Checks the vertical winning combinations for the respective move
 * @param {string} move The respective move, X or O
 * @returns {boolean} true if the entered move has a winning combination
 */
function checkColumn(move) {
    const condition_1 = gameArr[0][0] === move && gameArr[1][0] === move && gameArr[2][0] === move;
    const condition_2 = gameArr[0][1] === move && gameArr[1][1] === move && gameArr[2][1] === move;
    const condition_3 = gameArr[0][2] === move && gameArr[1][2] === move && gameArr[2][2] === move;
    return condition_1 === true || condition_2 == true || condition_3 === true;
}

/**
 * Checks the diagonal winning combinations for the respective move
 * @param {string} move The respective move, X or O
 * @returns {boolean} true if the entered move has a winning combination
 */
function checkDiag(move) {
    const condition_1 = gameArr[0][0] === move && gameArr[1][1] === move && gameArr[2][2] === move;
    const condition_2 = gameArr[0][2] === move && gameArr[1][1] === move && gameArr[2][0] === move;
    return condition_1 === true || condition_2 == true;
}


/**
 * Announces the winner of the game
 * @param {string} move 
 */
function announceWinner(move) {
    let status = document.getElementById('status');
    status.classList.add('you-won');
    status.innerHTML = `Congratulations! ${move} is the Winner!`
}


/**
 * The main driver for the actions taken in the game
 * @param {HTMLCollection} boardChildren A collection of the child divs
 * for the board div
 */
function gameplay(boardChildren) {
    for (let child = 0; child < boardChildren.length; child++) {
        let childElement = boardChildren[child];
        let firstMove = null;

        // Add on click event to each square to assign an O or an X
        childElement.addEventListener('click', function() {
            if (isNewGame(gameArr) === true) {
                console.log("im here");
                firstMove = initialPlay(childElement, child);
                movesArr.push(firstMove);
                movesCounter++;
            } else {
                let nextMove = getNextMove(movesCounter);
                gameMove(childElement, child, nextMove);
                movesArr.push(nextMove);
                movesCounter++;
            }
            if (winnerExists === false) {
                checkState('O');
                checkState('X');
            }
        });
        hoverSquare(childElement);
    };
}