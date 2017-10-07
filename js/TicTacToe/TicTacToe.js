import cloneDeep from 'lodash/fp/cloneDeep';

/**
 * @private
 * @type {{player: string, ai: string, isPlayerTurn: boolean, board: [null,null,null,null,null,null,null,null,null]}}
 */
export const defaultState = {
  player: 'X',
  ai: 'O',
  isPlayerTurn: true,
  board: [
    {id: 0, value: null},
    {id: 1, value: null},
    {id: 2, value: null},
    {id: 3, value: null},
    {id: 4, value: null},
    {id: 5, value: null},
    {id: 6, value: null},
    {id: 7, value: null},
    {id: 8, value: null}
  ]
};

/**
 * Creates a new copy of the default board state.
 * @return {object}
 */
function reset() {
  return cloneDeep(defaultState);
}

/**
 * Returns the cell value of the board (or null) if the any of the rows are a win.
 * @private
 * @param {Array} board
 * @return {Null|String}
 */
export function checkRowsForWin(board) {
  for (let i = 0; i <= 6; i += 3) {
    if (board[i].value !== null && board[i].value === board[i + 1].value && board[i + 1].value === board[i + 2].value) {
      return board[i].value;
    }
  }
  return null;
}

/**
 * Returns the cell value of the board (or null) if the any of the columns are a win.
 * @private
 * @param {Array} board
 * @return {Null|String}
 */
export function checkColumnsForWin(board) {
  for (let i = 0; i <= 2; i += 1) {
    if (board[i].value !== null && board[i].value === board[i + 3].value && board[i + 3].value === board[i + 6].value) {
      return board[i].value;
    }
  }
  return null;
}

/**
 * Returns the cell value of the board (or null) if the any of the diagonals are a win.
 * @private
 * @param {Array} board
 * @return {Null|String}
 */
export function checkDiagonalForWin(board) {
  for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (board[i].value !== null && board[i].value === board[i + j].value && board[i + j].value === board[i + 2 * j].value) {
      return board[i].value;
    }
  }
  return null;
}

/**
 * Returns all the empty squares
 * @private
 * @param {Array} board
 * @return {Array}
 */
export function getEmptySquares(board) {
  return board.filter(s => s.value === null);
}

/**
 * Returns the winner by checking all dimensions, or null if no winner is found
 * @param {Array} board
 * @return {null|string}
 */
export function getWinner(board) {
  let status = [
    checkRowsForWin(board),
    checkColumnsForWin(board),
    checkDiagonalForWin(board)
  ];

  return status.reduce((prev, curr) => {
    if (prev) {
      return prev;
    }
    return curr;
  });
}

/**
 * Create N boards with 1 additional move taken for every empty square
 * where N is the number of empty squares.
 * @private
 * @param board
 * @param tokenValue
 * @return {Array}
 */
export function generateBoards(board, tokenValue) {
  const squares = getEmptySquares(board);

  // Remap the empty cells do be the whole board with
  // all possible moves
  return squares.map(square => {
    const copy = cloneDeep(board);
    copy[square.id].value = tokenValue;
    return copy;
  });
}

/**
 * Determines the status of the game.
 * @param {Array} board
 * @param {Boolean} isMax
 * @return {Object} The result {gameOver, status, bestScore, board}
 */
function getGameStatus(board, isMax) {
  const result = {
    gameOver: false,
    status: 'None',
    bestScore: isMax ? -2 : 2,
    board
  };
  const winner = getWinner(board);

  if (winner !== null) {
    result.gameOver = true;
    result.bestScore = isMax ? -1 : 1;
    result.status = winner;
  } else if (getEmptySquares(board).length === 0) {
    result.status = 'Draw';
    result.bestScore = 0;
    result.gameOver = true;
  }

  return result;
}

/**
 * The heart of the AI. Tries to recursively find the best move by way of recursion
 * through all possible combinations to the end of the game.
 * @private
 * @param {Number} depth
 * @param {String} playerToken The token value used to represent the player.
 * @param {Array} board
 * @param {Boolean} isMax Used to determine the pass should be trying to maximize or minimize
 * @return {Object} {bestScore, move}
 */
export function minimax(depth, playerToken, board, isMax) {
  let bestScore = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  let boardWithMove;

  const currentGameStatus = getGameStatus(board, isMax);

  if (currentGameStatus.gameOver) {
    // console.log(currentGameStatus);
    return currentGameStatus;
  }

  const possibleBoards = generateBoards(board, playerToken);

  for (let i = 0; i < possibleBoards.length; i += 1) {
    const newBoard = possibleBoards[i];
    const score = minimax(depth + 1, isMax ? 'O' : 'X', newBoard, !isMax).bestScore;
    if (isMax) {
      if (score > bestScore) {
        bestScore = score;
        boardWithMove = newBoard;
      }
    } else if (score < bestScore) {
      bestScore = score;
      boardWithMove = newBoard;
    }
  }

  return { bestScore, boardWithMove };
}

/**
 * Simplifies how to get the next move.
 * @param board
 * @param playerToken
 * @return {{bestScore, boardWithMove}}
 */
export function getNextMove(board, playerToken) {
  return minimax(0, playerToken, board, playerToken === 'X');
}

export default {
  reset,
  getGameStatus,
  getNextMove
};