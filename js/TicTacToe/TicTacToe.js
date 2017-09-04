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
export function reset() {
  return cloneDeep(defaultState);
}

/**
 * Returns the cell value of the board (or null) if the any of the rows are a win.
 * @private
 * @param {array} board
 * @return {null|string}
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
 * @param {array} board
 * @return {null|string}
 */
export function checkColumnsForWin(board) {
  for (let i = 0; i <= 2; i++) {
    if (board[i].value !== null && board[i].value === board[i + 3].value && board[i + 3].value === board[i + 6].value) {
      return board[i].value;
    }
  }
  return null;
}

/**
 * Returns the cell value of the board (or null) if the any of the diagonals are a win.
 * @private
 * @param {array} board
 * @return {null|string}
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
 * @param {array} board
 * @return {array}
 */
export function getEmptySquares(board) {
  return board.filter(s => s.value === null);
}

/**
 * Returns the winner by checking all dimensions, or null if no winner is found
 * @param {array} board
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

export default {
  reset,
  getWinner
};