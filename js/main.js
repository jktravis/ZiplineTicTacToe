import React from 'react';
import { render } from 'react-dom';
import Typed from 'typed.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import '../css/main.css';
import App from './App';

import { ticTacToe as TicTacToe } from './engine';

const squares = $('.square');
let player;
let ai;

$('.modal-body button').on('click', function () {
  player = this.id;
  TicTacToe.createBoard();

  if (player === 'X') {
    ai = 'O';
  } else if (player === 'O') {
    ai = 'X';
    aiPlay(Math.floor(Math.random() * TicTacToe.board.length));
  }

  updateMessage(`Playing as ${player}`);

  TicTacToe.turn = player;

  squares.on('click', function () {
    const $this = $(this);
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

function aiPlay(move) {
  let nextMove;
  if (move) {
    nextMove = move;
  } else {
    nextMove = TicTacToe._getNextMove();
  }
  TicTacToe.makeMove(nextMove);
  $(`#${nextMove}`).text(ai);
  TicTacToe._switchTurn();
}

function updateMessage(m) {
  $('#message').html(m);
}

$('#reset').on('click', function () {
  $('.square').html('&nbsp;');
  TicTacToe.reset();
  updateMessage('&nbsp;');
  $(this).text('Reset').removeClass('btn-success').addClass('btn-warning');
});

new Typed('#message', {
  strings: ['Shall we play a game?'],
  typeSpeed: 40,
  backDelay: 30000,
  backSpeed: 20,
  loop: false
});


render(<App/>, document.getElementById('root'));
