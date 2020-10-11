window.addEventListener('load',
    function() {
        document.getElementsByClassName('btn')[0].onclick = function() {
            let board = document.getElementById('board').children
            addSquares(board);
            gameplay(board);
        }
    }
);

/**
 * Assigns the square class to the children ofthe board
 * @param {object} boardChildren The children of the div assigned the id board
 */
function addSquares(boardChildren) {
    for (child in boardChildren) {
        boardChildren[child].className = 'square';
        boardChildren[child].innerHTML = '';
    }
}



/**
 * Places an X or an O in the specified div
 * @param {object} element The div the X or O is being placed in.
 * @param {string} move The respective move being played. Either X or O
 */
function placeMove(element, move) {
    if (move === 'X') {
        element.className += " X";
        element.innerHTML = 'X';
    } else {
        element.className += " O";
        element.innerHTML = 'O';
    }

}


/**
 * Checks if the game is a new game
 * @param {Array} gameArr The array that keeps track of the game's state.
 * @returns {boolean} true if the game is a new game and false otherwise.
 */
function isNewGame(gameArr) {
    for (let arrIndex = 0; arrIndex < gameArr.length; arrIndex++) {
        let innerArr = gameArr[arrIndex];
        for (let innerIndex = 0; innerIndex < innerArr.length; innerIndex++) {
            if (innerArr[innerIndex] !== null) {
                return false;
            }
        }
    }
    return true;
}

/**
 * 
 * @param {Array} gameArr The array that keeps track of the game's state
 * @param {number} index The index of the div being selected
 * @param {string} move The respective move being played. Either X or O
 */
function placePlay(gameArr, index, move) {
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
 * 
 * @param {object} element The div the X or O is being placed in.
 * @param {Array} gameArr The array that keeps track of the game's state
 * @param {number} position The index of the div being selected
 * @returns {string} The first move of the game, either X or O
 */
function initialPlay(element, gameArr, position) {
    let moves = ['X', 'O'];

    // Randomly select the first move
    let index = Math.floor(Math.random() * moves.length);
    let firstMove = moves[index];
    placeMove(element, firstMove)
    placePlay(gameArr, position, firstMove);
    return firstMove;
}

/**
 * 
 * @param {Array} movesArr - The array that keeps track of the moves played
 * @param {number} moveNo - The move number in the game 
 * @returns {string} The next move to be played
 */
function getNextMove(movesArr, moveNo) {
    if (movesArr[moveNo - 1] === 'X') {
        return 'O';
    } else {
        return 'X';
    }
}

/**
 *  Handles the logic of each move in the game.
 * @param {object} element The div the X or O is being placed in.
 * @param {Array} gameArr The array that keeps track of the game's state
 * @param {number} position The index of the div being selected
 * @param {string} nextMove The next move to be played
 */
function gameMove(element, gameArr, position, nextMove) {
    placeMove(element, nextMove);
    placePlay(gameArr, position, nextMove)
}

/**
 * Adds event listeners to the specified div to toggle the 'hover' class from
 * the stylesheets.
 * @param {object} element The divv being hovered over
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
 * The main driver of the game 
 * @param {object} boardChildren A collection of the child divs of the "board" div
 */
function gameplay(boardChildren) {
    let gameArr = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];
    var movesArr = []
    var movesCounter = 0;


    for (let child = 0; child < boardChildren.length; child++) {
        let childElement = boardChildren[child];
        let firstMove = null;
        childElement.addEventListener('click', function() {
            if (isNewGame(gameArr) === true) {
                firstMove = initialPlay(childElement, gameArr, child);
                movesArr.push(firstMove);
                movesCounter++;
            } else {
                let nextMove = getNextMove(movesArr, movesCounter);
                gameMove(childElement, gameArr, child, nextMove);
                movesArr.push(nextMove);
                movesCounter++;
            }

        });
        hoverSquare(childElement);

    };

}