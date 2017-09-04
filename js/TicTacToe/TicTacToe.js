import cloneDeep from 'lodash/fp/cloneDeep';

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

export function reset() {
  return cloneDeep(defaultState);
}

export function checkRowsForWin(board) {
  for (let i = 0; i <= 6; i += 3) {
    if (board[i].value !== null && board[i].value === board[i + 1].value && board[i + 1].value === board[i + 2].value) {
      return {winner: board[i].value};
    }
  }
  return {winner: null};
}

export function checkColumnsForWin(board) {
  for (let i = 0; i <= 2; i++) {
    if (board[i].value !== null && board[i].value === board[i + 3].value && board[i + 3].value === board[i + 6].value) {
      return {winner: board[i].value};
    }
  }
  return {winner: null};
}

export function checkDiagonalForWin(board) {
  for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (board[i].value !== null && board[i].value === board[i + j].value && board[i + j].value === board[i + 2 * j].value) {
      return {winner: board[i].value};
    }
  }
  return {winner: null};
}

export function isGameOver(board) {

  // check rows
  if (checkColumnsForWin(board)) {

  }

  // check columns

  // check diagonals

  const available = this.emptyCells();
  if (available.length == 0) {
    // the game is draw
    this.result = "Draw. But isn't it really losing?"; // update the state result
    return true;
  }
  return false;
}

export default {
  reset
};