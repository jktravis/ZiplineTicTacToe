exports.ticTacToe = {
  board: [],
  turn: '',

  createBoard: function () {
    for (var i = 0; i < 9; i++) {
      this.board.push(null);
    }
    return this.board;
  },

  makeMove: function (move) {
    if (this.turn === '') {
      throw Error('Turn value cannot be empty.');
    }
    if (this._isValidMove(move)) {
      this.board[move] = this.turn;
      this._switchTurn();
      return true;
    }
    else {
      return false;
    }
  },

  _isValidMove: function (move) {
    return this.board[move] === null;
  },

  _switchTurn: function () {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  },

  _getNextMove: function () {
    if (this.isWon()) {
      return -1;
    } else {
      var move = Math.floor(Math.random() * 9);
      var count = 0;
      while (!this._isValidMove(move) && count < 8) {
        move = Math.floor(Math.random() * 9);
        count++;
      }
      return move;
    }
  },

  isWon: function () {
    return !!((this.board[0] === this.board[1] && this.board[1] === this.board[2]) || // check rows
    (this.board[3] === this.board[4] && this.board[4] === this.board[5]) ||
    (this.board[6] === this.board[7] && this.board[7] === this.board[8]) ||
    //check columns
    (this.board[0] === this.board[3] && this.board[3] === this.board[6]) ||
    (this.board[1] === this.board[4] && this.board[4] === this.board[7]) ||
    (this.board[2] === this.board[5] && this.board[5] === this.board[8]) ||
    //check diagonals
    (this.board[0] === this.board[4] && this.board[4] === this.board[8]) ||
    (this.board[2] === this.board[4] && this.board[4] === this.board[6]));
  }
};

