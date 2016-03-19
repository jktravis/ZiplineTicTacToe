$(document).ready(function() {
  var TicTacToe = exports.ticTacToe;
  var squares = $('.square');
  var player = {
    turn: true,
    token: 'X'
  };

  TicTacToe.createBoard();
  TicTacToe.turn = 'X';

  squares.click(function(){
    var $this = $(this);
    if (!TicTacToe.result.match(/(draw|won)/g) || TicTacToe.emptyCells() !== 0) {
      if ($this.text() !== '&nbsp;') {
        if (TicTacToe.makeMove(this.id)) {
          player.turn = false;
          $this.text('X');

          var nextMove = TicTacToe._getNextMove();
          TicTacToe.makeMove(nextMove);
          $('#' + nextMove).text('O');
          player.turn = true;
        }
      }
      else {
        alert("Invalid move." + this.id);
      }
    }
  })
});