import expect from 'expect';

import TicTacToe, { defaultState } from './TicTacToe';

describe("TicTacToeReact", () => {
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