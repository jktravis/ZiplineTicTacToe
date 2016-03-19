$(document).ready(function() {
  var TicTacToe = exports.ticTacToe;
  var squares = $('.square');
  var msg = "Shall we plan a game?";
  var player = {
    turn: true,
    token: 'X'
  };

  updateMessage(msg);
  //todo: prompt for token.
  TicTacToe.createBoard();
  TicTacToe.turn = 'X';

  squares.click(function(){
    var $this = $(this);
    if (!isTerminal()) {
      if ($this.text() !== '&nbsp;') {
        if (TicTacToe.makeMove(this.id)) {
          $this.text('X');

          var nextMove = TicTacToe._getNextMove();
          TicTacToe.makeMove(nextMove);
          $('#' + nextMove).text('O');
          updateMessage(TicTacToe.result);
        }
      }
    }

    if (isTerminal()) {
      updateMessage(TicTacToe.result);
    }
  });

  function isTerminal() {
    return (TicTacToe.result.match(/(draw|won)/g) || TicTacToe.emptyCells() === 0);
  }

  function updateMessage(m) {
    $("#message").text(m);
  }
});