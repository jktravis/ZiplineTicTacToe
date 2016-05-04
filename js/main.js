require('bootstrap/dist/css/bootstrap.min.css');
require('bootstrap');
require('../css/main.css');

require('../vendor/typed.js/dist/typed.min');

var TicTacToe = require('./engine').ticTacToe;

var squares = $('.square');
var player, ai;

$('.modal-body button').on('click', function () {
  player = this.id;
  TicTacToe.createBoard();

  if (player === 'X') {
    ai = 'O';
  }
  else if (player === 'O') {
    ai = 'X';
    aiPlay();
  }

  updateMessage("Playing as " + player);

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
  TicTacToe.makeMove(nextMove);
  $('#' + nextMove).text(ai);
  TicTacToe._switchTurn();
}

function updateMessage(m) {
  $("#message").html(m);
}

$("#reset").on("click", function () {
  $(".square").html('&nbsp;');
  TicTacToe.reset();
  updateMessage("&nbsp;");
  $(this).text('Reset').removeClass('btn-success').addClass('btn-warning');
});

(function () {
  $('#message').typed({
    strings: ['Shall we play a game?'],
    typeSpeed: 40,
    backDelay: 30000,
    backSpeed: 20,
    loop: false
  });
})();


