exports.ticTacToe = {
  board: [],
  turn: '',

  createBoard: function () {
    for (var i = 0; i < 3; i++) {
      this.board.push([null, null, null]);
    }
    return this.board;
  },

  makeMove: function (move) {
    if (this.turn === '') {
      throw Error('Turn value cannot be empty.');
    }
    if (this.isValidMove(move, this.board)) {
      this.board[move[0]][move[1]] = this.turn;
      this.switchTurn();
      return true;
    }
    else {
      return false;
    }
  },

  isValidMove: function (move) {
    return this.board[move[0]][move[1]] === null;
  },

  switchTurn: function () {
    if (this.turn === 'X') {
      this.turn = 'O';
    }
    else {
      this.turn = 'X';
    }
  }

};

