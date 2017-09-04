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
      return board[i].value;
    }
  }
  return null;
}

export function checkColumnsForWin(board) {
  for (let i = 0; i <= 2; i++) {
    if (board[i].value !== null && board[i].value === board[i + 3].value && board[i + 3].value === board[i + 6].value) {
      return board[i].value;
    }
  }
  return null;
}

export function checkDiagonalForWin(board) {
  for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (board[i].value !== null && board[i].value === board[i + j].value && board[i + j].value === board[i + 2 * j].value) {
      return board[i].value;
    }
  }
  return null;
}

export function getEmptySquares(board) {
  return board.filter(s => s.value === null);
}

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
  reset
};