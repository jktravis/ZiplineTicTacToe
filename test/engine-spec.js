var chai = require('chai'),
  expect = chai.expect,
  engine = require('../static/js/engine.js').ticTacToe;

describe('Engine', function () {

  describe('createBoard', function () {
    it('should return an array of 3 arrays with 3 null values', function () {
      var board = engine.createBoard();
      expect(board).to.deep.equal(
        [[null, null, null],
         [null, null, null],
         [null, null, null]]
      );
    })
  });

  describe('isValidMove', function () {
    it('should return true if the move the board[x][y] value is null', function() {
      var board = engine.createBoard();
      var move = [0, 1];
      expect(engine.isValidMove(move, board)).to.equal(true);
    });
    it('should return false if the move is illegal', function() {
      var board = engine.createBoard();
      var move = [0, 1];

      board[0][1] = 'X';
      expect(engine.isValidMove(move, board)).to.equal(false);
    });
  })
});