exports.ticTacToe = {
  board: [],
  turn: '',
  result: '',

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
    if (this.isGameOver()) {
      return false;
    }
    return this.board[move] === null;
  },

  _switchTurn: function () {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  },

  _getNextMove: function () {
    if (this.isGameOver() === true) {
      return true;
    }
    var move = Math.floor(Math.random() * 9);
    var count = 0;
    while (!this._isValidMove(move) && count < 8) {
      move = Math.floor(Math.random() * 9);
      count++;
    }
    return move;
  },

  emptyCells: function () {
    var indxs = [];
    for (var itr = 0; itr < 9; itr++) {
      if (this.board[itr] === null) {
        indxs.push(itr);
      }
    }
    return indxs;
  },

  isGameOver: function () {
    var B = this.board, i;

    //check rows
    for (i = 0; i <= 6; i = i + 3) {
      if (B[i] !== null && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
        this.result = B[i] + "-won"; //update the state result
        return true;
      }
    }

    //check columns
    for (i = 0; i <= 2; i++) {
      if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        this.result = B[i] + "-won"; //update the state result
        return true;
      }
    }

    //check diagonals
    for (i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
      if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
        this.result = B[i] + "-won"; //update the state result
        return true;
      }
    }

    var available = this.emptyCells();
    if (available.length == 0) {
      //the game is draw
      this.result = "draw"; //update the state result
      return true;
    }
    else {
      return false;
    }
  }
};

