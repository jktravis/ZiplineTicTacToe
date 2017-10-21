import TicTacToe, {
  defaultState,
  checkDiagonalForWin,
  checkColumnsForWin,
  checkRowsForWin,
  getEmptySquares,
  generateBoards,
  minimax,
  getWinner
} from './TicTacToe';

describe("TicTacToe", () => {
  describe("reset", () => {
    it("should return the default board", () => {
      expect(TicTacToe.reset()).toEqual(defaultState);
    });

    it("should have unique references", () => {
      const state = TicTacToe.reset();
      expect(state).not.toBe(defaultState);
      state.board.forEach((cell, idx) => {
        expect(cell).toEqual(defaultState.board[idx]);
        expect(cell).not.toBe(defaultState.board[idx]);
      });
    });
  });

  describe("checkRowForWin", () => {
    it("should return the winner if there are three in a row across the top", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[1].value = 'X';
      board[2].value = 'X';
      const winner = checkRowsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the middle", () => {
      const { board } = TicTacToe.reset();
      board[3].value = 'X';
      board[4].value = 'X';
      board[5].value = 'X';
      const winner = checkRowsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the bottom", () => {
      const { board } = TicTacToe.reset();
      board[6].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const winner = checkRowsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return undefined if no matches across row", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const winner = checkRowsForWin(board);
      expect(winner).toBe(null);
    });

  });

  describe("checkColumnForWin", () => {
    it("should return the winner if there are three in a row across the left", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[3].value = 'X';
      board[6].value = 'X';
      const winner = checkColumnsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the middle", () => {
      const { board } = TicTacToe.reset();
      board[1].value = 'X';
      board[4].value = 'X';
      board[7].value = 'X';
      const winner = checkColumnsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return the winner if there are three in a row across the right", () => {
      const { board } = TicTacToe.reset();
      board[2].value = 'X';
      board[5].value = 'X';
      board[8].value = 'X';
      const winner = checkColumnsForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return undefined if no matches across column", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const winner = checkColumnsForWin(board);
      expect(winner).toBe(null);
    });

  });

  describe("checkDiagonalsForWin", () => {
    it("should return the winner if there are three in a diagonal from top-left to bottom-right", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[4].value = 'X';
      board[8].value = 'X';
      const winner = checkDiagonalForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return the winner if there are three in a diagonal from top-right to bottom-left", () => {
      const { board } = TicTacToe.reset();
      board[2].value = 'X';
      board[4].value = 'X';
      board[6].value = 'X';
      const winner = checkDiagonalForWin(board);
      expect(winner).toEqual('X');
    });

    it("should return null if no matches across a diagonal", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[7].value = 'X';
      board[8].value = 'X';
      const winner = checkDiagonalForWin(board);
      expect(winner).toBe(null);
    });

  });

  describe("getEmptySquares", () => {
    it("should return an array of squares with values of null", () => {
      const { board } = TicTacToe.reset();
      expect(getEmptySquares(board).length).toEqual(9);
      board[0].value = 'X';
      expect(getEmptySquares(board).length).toEqual(8);
      board[1].value = 'X';
      board[2].value = 'X';
      board[4].value = 'X';
      expect(getEmptySquares(board).length).toEqual(5);
    });
  });

  describe("getWinner", () => {
    it("should return a boolean if the game has been won", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      board[1].value = 'X';
      board[2].value = 'X';
      expect(getWinner(board)).toEqual('X');
    });

    it("should return null if the winner was yet to be determined", () => {
      const { board } = TicTacToe.reset();
      expect(getWinner(board)).toEqual(null);
    });
  });

  describe("generateBoards", () => {
    it("should return N number of boards, where N is the number of empty squares on the board", () => {
      const { board } = TicTacToe.reset();
      expect(generateBoards(board, 'O').length).toEqual(9);

      board[0].value = 'X';
      expect(generateBoards(board, 'O').length).toEqual(8);

      board[1].value = 'X';
      board[3].value = 'X';
      board[8].value = 'X';
      expect(generateBoards(board, 'O').length).toEqual(5);
    });

    it("should have one additional move for each board", () => {
      const { board } = TicTacToe.reset();
      let genBoards = generateBoards(board, 'O');
      genBoards.forEach(b => {
        expect(getEmptySquares(b).length).toEqual(8);
      });

      board[0].value = 'X';

      genBoards = generateBoards(board, 'O');
      genBoards.forEach(b => {
        expect(getEmptySquares(b).length).toEqual(7);
      });

      board[1].value = 'X';
      board[2].value = 'X';
      board[3].value = 'X';
      board[4].value = 'X';

      genBoards = generateBoards(board, 'O');
      genBoards.forEach(b => {
        expect(getEmptySquares(b).length).toEqual(3);
      });
    });
  });

  describe("getGameStatus", () => {
    it("should return an object with score, status, and gameOver flag", () => {
      const { board } = TicTacToe.reset();
      const result = TicTacToe.getGameStatus(board, true);
      expect(result.gameOver).toEqual(false);
      expect(result.status).toEqual('None');
      expect(result.bestScore).toEqual(-2);
      expect(result.board).toBe(board);
    });
  });

  describe("minimax", () => {
    it("should return a bestScore and another board with the chosen move made", () => {
      const { board } = TicTacToe.reset();
      board[0].value = 'X';
      const result = minimax(0, 'O', board, false);
      expect(result.bestScore).not.toBe(undefined);
      expect(Array.isArray(result.boardWithMove)).toBe(true, 'board is not an array');
      expect(getEmptySquares(result.boardWithMove).length).toEqual(getEmptySquares(board).length - 1);
    });
  });
});