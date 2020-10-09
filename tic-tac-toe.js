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


function gameMove(element, move) {
    if (move == 'X') {
        return 'O';
    } else {
        return 'X';
    }

}

function placeX(element) {
    element.className += " X";
    element.innerHTML = 'X';
}

function placeO(element) {
    element.className += " O";
    element.innerHTML = 'O';
}

function clickableDivs(boardChildren) {
    console.log(boardChildren)

}

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

function initialPlay(element, gameArr, position) {
    let moves = ['X', 'O'];
    let index = Math.floor(Math.random() * moves.length);
    let firstMove = moves[index];
    if (firstMove === 'X') {
        placeX(element);
        placePlay(gameArr, position, firstMove);
    } else {
        placeO(element);
        placePlay(gameArr, position, firstMove);
    }
    console.log(gameArr)
}
/**
 * 
 * @param {object} boardChildren A collection of the child divs of the
 * "board" div
 */
function gameplay(boardChildren) {
    let gameArr = [
        [null, null, null],
        [null, null, null],
        [null, null, null]
    ];


    for (let child = 0; child < boardChildren.length; child++) {
        let childElement = boardChildren[child];
        let firstMove = false;
        childElement.addEventListener('click', function() {
            if (isNewGame(gameArr) === true) {
                firstMove = true;
            }
            if (firstMove === true) {
                initialPlay(childElement, gameArr, child)
            } else {

            }
            // placeX(childElement);
            firstMove = false;

        });

    };

}