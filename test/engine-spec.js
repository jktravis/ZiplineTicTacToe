let chai = require('chai'),
  expect = chai.expect,
  TicTacToe = require('../js/engine.js').ticTacToe;

describe('TicTacToe', () => {
  it('should have a board property', () => {
    expect(TicTacToe).to.have.ownProperty('board');
  });

  it('should have a turn property', () => {
    expect(TicTacToe).to.have.ownProperty('turn');
  });

  describe('createBoard', () => {
    it('should return an array of 9 null values.', () => {
      TicTacToe.createBoard();
      expect(TicTacToe.board).to.deep.equal(
        [null, null, null, null, null, null, null, null, null]
      );
    });
  });

  describe('_isValidMove', () => {
    it('should return true if the board[move] value is null', () => {
      expect(TicTacToe._isValidMove(4)).to.equal(true);
    });

    it('should return false if the move is illegal', () => {
      TicTacToe.board[4] = 'X';
      expect(TicTacToe._isValidMove(4)).to.equal(false);
    });
  });

  describe('makeMove', () => {
    it('should throw an exception when no turn has been set', () => {
      expect(() => {
        TicTacToe.makeMove(4);
      }).to.throw('Turn value cannot be empty');
    });

    it('should return true if the move was successful', () => {
      TicTacToe.turn = 'X';
      TicTacToe.board[4] = null;
      expect(TicTacToe.makeMove(4)).to.equal(true);
    });

    it('should return false if the move was unsuccessful', () => {
      TicTacToe.turn = 'O';
      expect(TicTacToe.makeMove(4)).to.equal(false);
    });
  });

  describe('_switchTurn', () => {
    it('should set the turn to X if not set', () => {
      TicTacToe.turn = '';
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('X');
    });

    it('should set the turn to O if set to X', () => {
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('O');
    });

    it('should set the turn to X if set to O', () => {
      TicTacToe._switchTurn();
      expect(TicTacToe.turn).to.equal('X');
    });
  });

  describe('_getNextMove', () => {
    it('should return an integer representing the move', () => {
      const move = TicTacToe._getNextMove();
      expect(move).to.be.within(-1, 8);
    });
  });
});
