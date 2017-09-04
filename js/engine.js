import minimax from './minimax';

function prettyPrint(board) {
  const pad = function (text) {
    if (text) {
      return `  ${text}  `;
    }
    return ' null';
  };

  let i = 0;
  console.log('========Start========');
  for (i; i < 8; i += 3) {
    console.log(`${pad(board[i])} | ${pad(board[i + 1])} | ${pad(board[i + 2])}`);
  }
  console.log('=========End=========');
  console.log();
}

export const ticTacToe = {
  board: [],
  turn: '',
  result: '',

  createBoard() {
    this.board = [];
    for (let i = 0; i < 9; i++) {
      this.board.push(null);
    }
    return this.board;
  },

  makeMove(move) {
    if (this.turn === '') {
      throw Error('Turn value cannot be empty.');
    }
    if (this._isValidMove(move)) {
      this.board[move] = this.turn;
      if (!this.isGameOver()) {
        this._switchTurn();
      }
      return true;
    }
    return false;
  },

  _isValidMove(move) {
    return this.board[move] === null;
  },

  _switchTurn() {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  },

  _getNextMove() {
    if (!this.isGameOver()) {
      const result = minimax(0, this.turn, this.board, this.turn === 'X');
      const moveDiff = this.diffBoard(this.board, result.move);
      this.board = result.move;
      return moveDiff;
    }
  },

  diffBoard(current, next) {
    for (let i = 0; i < current.length; i++) {
      if (current[i] !== next[i]) {
        return i;
      }
    }
  },

  emptyCells() {
    const indexes = [];
    for (let itr = 0; itr < 9; itr++) {
      if (this.board[itr] === null) {
        indexes.push(itr);
      }
    }
    return indexes;
  },

  isGameOver() {
    let B = this.board;

    // check rows
    for (let i = 0; i <= 6; i += 3) {
      if (B[i] !== null && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
        this.result = `${B[i]} wins!`; // update the state result
        return true;
      }
    }

    // check columns
    for (let i = 0; i <= 2; i++) {
      if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        this.result = `${B[i]} wins!`; // update the state result
        return true;
      }
    }

    // check diagonals
    for (let i = 0, j = 4; i <= 2; i += 2, j -= 2) {
      if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
        this.result = `${B[i]} wins!`; // update the state result
        return true;
      }
    }

    const available = this.emptyCells();
    if (available.length == 0) {
      // the game is draw
      this.result = "Draw. But isn't it really losing?"; // update the state result
      return true;
    }
    return false;
  },

  reset() {
    this.createBoard();
    this.turn = 'X';
    this.result = '';
  }
};

