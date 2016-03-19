$(document).ready(function() {
  var TicTacToe = exports.ticTacToe;
  var squares = $('.square');
  var player = {
    token: 'X'
  };


  updateMessage("Shall we plan a game?");
  //todo: prompt for token.
  TicTacToe.createBoard();
  TicTacToe.turn = 'X';

  squares.click(function(){
    var $this = $(this);
    if (!TicTacToe.isGameOver()) {
      if ($this.text() !== '&nbsp;') {
        if (TicTacToe.makeMove(this.id)) {
          $this.text('X');

          var nextMove = TicTacToe._getNextMove();
          if (TicTacToe.isGameOver() !== true) {
            TicTacToe.makeMove(nextMove);
            $('#' + nextMove).text('O');
          }
        }
      }
    }

    updateMessage(TicTacToe.result);
  });

  function updateMessage(m) {
    $("#message").text(m);
  }

  $("#reset").on("click", function () {
    $(".square").html('&nbsp;');
    TicTacToe.reset();
    updateMessage("");
  })
});