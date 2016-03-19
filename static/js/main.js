$(document).ready(function () {
  var TicTacToe = exports.ticTacToe;
  var squares = $('.square');
  var player, ai;

  updateMessage("Shall we plan a game?");

  $('.modal-body button').on('click', function () {
    player = this.id;

    if (player === 'X') {
      ai = 'O';
    }
    else if (player === 'O') {
      ai = 'X';
    }
    updateMessage("Playing as " + player);

    TicTacToe.createBoard();
    TicTacToe.turn = player;

    squares.on("click", function () {
      var $this = $(this);
      if (!TicTacToe.isGameOver()) {
        if ($this.text() !== '&nbsp;') {
          if (TicTacToe.makeMove(this.id)) {
            $this.text(player);
            aiPlay();
          }
        }
      }
      if (TicTacToe.isGameOver()) {
        updateMessage(TicTacToe.result);
      }
    });
  });

  function aiPlay() {
    var nextMove = TicTacToe._getNextMove();
    if (TicTacToe.isGameOver() !== true) {
      TicTacToe.makeMove(nextMove);
      $('#' + nextMove).text(ai);
    }
  }

  function updateMessage(m) {
    $("#message").html(m);
  }

  $("#reset").on("click", function () {
    $(".square").html('&nbsp;');
    TicTacToe.reset();
    updateMessage("&nbsp;");
  })
});