import expect from 'expect';

import TicTacToe, { defaultState, checkDiagonalForWin, checkColumnsForWin, checkRowsForWin } from './TicTacToe';

describe("TicTacToeReact", () => {
  describe("reset", () => {
    it("should return the default board", () => {
      expect(TicTacToe.reset()).toEqual(defaultState);
    });

    it("should have unique references", () => {
      const state = TicTacToe.reset();
      expect(state).toNotBe(defaultState);
      state.board.forEach((cell, idx) => {
        expect(cell).toEqual(defaultState.board[idx]);
        expect(cell).toNotBe(defaultState.board[idx]);
      });
    });
  });

  describe("checkRowForWin", () => {
    it("should return the winner if there are three in a row across the top", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[1].value = 'X';
      board[2].value = 'X';
      const result = checkRowsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the middle", () => {
      const {board} = TicTacToe.reset();
      board[3].value = 'X';
      board[4].value = 'X';
      board[5].value = 'X';
      const result = checkRowsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the bottom", () => {
      const {board} = TicTacToe.reset();
      board[6].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const result = checkRowsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return undefined if no matches across row", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const result = checkRowsForWin(board);
      expect(result.winner).toBe(null);
    });

  });

  describe("checkColumnForWin", () => {
    it("should return the winner if there are three in a row across the left", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[3].value = 'X';
      board[6].value = 'X';
      const result = checkColumnsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the middle", () => {
      const {board} = TicTacToe.reset();
      board[1].value = 'X';
      board[4].value = 'X';
      board[7].value = 'X';
      const result = checkColumnsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the right", () => {
      const {board} = TicTacToe.reset();
      board[2].value = 'X';
      board[5].value = 'X';
      board[8].value = 'X';
      const result = checkColumnsForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return undefined if no matches across column", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const result = checkColumnsForWin(board);
      expect(result.winner).toBe(null);
    });

  });

  describe("checkDiagonalsForWin", () => {
    it("should return the winner if there are three in a diagonal from top-left to bottom-right", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[4].value = 'X';
      board[8].value = 'X';
      const result = checkDiagonalForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return the winner if there are three in a diagonal from top-right to bottom-left", () => {
      const {board} = TicTacToe.reset();
      board[2].value = 'X';
      board[4].value = 'X';
      board[6].value = 'X';
      const result = checkDiagonalForWin(board);
      expect(result.winner).toEqual('X');
    });

    it("should return null if no matches across a diagonal", () => {
      const {board} = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const result = checkDiagonalForWin(board);
      expect(result.winner).toBe(null);
    });

  });
});