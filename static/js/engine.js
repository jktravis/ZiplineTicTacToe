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
      if (!this.isGameOver()) {
        this._switchTurn();
      }
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
    var empty = this.emptyCells();
    var move = Math.floor(Math.random() * empty.length);
    return empty[move];
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
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    //check columns
    for (i = 0; i <= 2; i++) {
      if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    //check diagonals
    for (i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
      if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    var available = this.emptyCells();
    if (available.length == 0) {
      //the game is draw
      this.result = "Draw. But isn't it really losing?"; //update the state result
      return true;
    }
    else {
      return false;
    }
  },

  reset: function () {
    for (var i = 0; i < 9; i++) {
      this.board[i] = null;
    }
    this.turn = 'X';
    this.result = '';
  }
};

