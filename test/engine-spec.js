var chai = require('chai'),
  expect = chai.expect,
  TicTacToe = require('../js/engine.js').ticTacToe;

describe('TicTacToe', function () {

  it('should have a board property', function () {
    expect(TicTacToe).to.have.ownProperty('board');
  });

  it('should have a turn property', function () {
    expect(TicTacToe).to.have.ownProperty('turn');
  });

  describe('createBoard', function () {
    it('should return an array of 9 null values.', function () {
      TicTacToe.createBoard();
      expect(TicTacToe.board).to.deep.equal(
        [null, null, null, null, null, null, null, null, null]
      );
    })
  });

  describe('_isValidMove', function () {
    it('should return true if the board[move] value is null', function () {
      expect(TicTacToe._isValidMove(4)).to.equal(true);
    });

    it('should return false if the move is illegal', function () {
      TicTacToe.board[4] = 'X';
      expect(TicTacToe._isValidMove(4)).to.equal(false);
    });
  });

  describe('makeMove', function () {
    it('should throw an exception when no turn has been set', function () {
      expect(function () {
        TicTacToe.makeMove(4);
      }).to.throw('Turn value cannot be empty');
    });

    it('should return true if the move was successful', function () {
      TicTacToe.turn = 'X';
      TicTacToe.board[4] = null;
      expect(TicTacToe.makeMove(4)).to.equal(true);
    });

    it('should return false if the move was unsuccessful', function () {
      TicTacToe.turn = 'O';
      expect(TicTacToe.makeMove(4)).to.equal(false);
    });
  });

  describe('_switchTurn', function () {
    it('should set the turn to X if not set', function () {
      TicTacToe.turn = '';
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('X');
    });

    it('should set the turn to O if set to X', function () {
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('O');
    });

    it('should set the turn to X if set to O', function () {
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('X');
    });
  });

  describe('_getNextMove', function () {
    it('should return an integer representing the move', function () {
      var move = TicTacToe._getNextMove();
      expect(move).to.be.within(-1, 8);
    });
  })
});