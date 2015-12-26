exports.ticTacToe = {
  createBoard: function () {
    var board = [];
    for (var i = 0; i < 3; i++) {
      board.push([null, null, null]);
    }
    return board;
  },

  makeMove: function (move, board) {
    console.log(move, board);
  },

  isValidMove: function (move, board) {
    return board[move[0]][move[1]] === null;
  }
};

