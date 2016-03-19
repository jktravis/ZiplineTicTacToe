$(document).ready(function() {
  var TicTacToe = exports.ticTacToe;
  var squares = $('.square');
  var player = {
    turn: true,
    token: 'X'
  };

  updateMessage("Shall we plan a game?");
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
          if (nextMove !== false) {
            TicTacToe.makeMove(nextMove);
            $('#' + nextMove).text('O');
          }
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

  $("#reset").on("click", function () {
    $(".square").html('&nbsp;');
    TicTacToe.reset();
    updateMessage("");
  })
});