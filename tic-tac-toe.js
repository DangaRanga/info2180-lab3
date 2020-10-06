window.addEventListener('load',
    function(){
        document.getElementsByClassName('btn')[0].onclick = function(){
            let board = document.getElementById('board').children
                addSquares(board);
            }
        }
    );

/**
 * Assigns the square class to the children ofthe board
 * @param {object} board The children of the div assigned the id board
 */
function addSquares (board){
    for(child in board){
        board[child].className = 'square';
    }
}