exports.ticTacToe = {
  board: [],
  createBoard: function () {
    for (var i = 0; i < 3; i++) {
      this.board.push([null, null, null]);
    }
    return this.board;
  },

  makeMove: function (move, board) {
    if(this.isValidMove(move, board)) {
      board[move[0]][move[1]] = move[2];
      return true;
    }
    else {
      return false;
    }
  },

  isValidMove: function (move, board) {
    return board[move[0]][move[1]] === null;
  }
};

