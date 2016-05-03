function getGameStatus(board, isMax) {
  var B = board, i, j;
  var result = {
    gameOver: false,
    status: 'None',
    bestScore: isMax ? -2 : 2,
    board: board
  };

  //check rows
  for (i = 0; i <= 6; i = i + 3) {
    if (B[i] !== null && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
      result.status = B[i] + " wins!"; //update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  //check columns
  for (i = 0; i <= 2; i++) {
    if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
      result.status = B[i] + " wins!"; //update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  //check diagonals
  for (i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
    if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
      result.status = B[i] + " wins!"; //update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  var empty = emptyCells(board);
  if (empty.length == 0) {
    //the game is draw
    result.status = "Draw. But isn't it really losing?"; //update the state result
    result.bestScore = 0;
    result.gameOver = true;
    return result;
  }
  else {
    return result;
  }
}

function emptyCells(board) {
  var available = [];

  for (var i = 0; i < board.length; i++) {
    if (board[i] === null) {
      available.push(i);
    }
  }
  return available;
}

function generateBoards(board, player) {
  var _ = require('lodash');
  var possibleBoards = [];
  var empty = emptyCells(board);

  for (var i = 0; i < empty.length; i++) {
    var copy = _.clone(board);
    copy[empty[i]] = player;
    possibleBoards.push(copy);
  }
  return possibleBoards;
}

function minimax(depth, player, board, isMax) {
  var bestScore = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  var move;

  var currentGameStatus = getGameStatus(board, isMax);

  if (currentGameStatus.gameOver) {
    // console.log(currentGameStatus);
    return currentGameStatus;
  }

  var possibleBoards = generateBoards(board, player);

  for (var i = 0; i < possibleBoards.length; i++) {
    var newBoard = possibleBoards[i];
    var score = minimax(depth + 1, isMax ? 'O' : 'X', newBoard, !isMax).bestScore;
    if (isMax) {
      if (score > bestScore) {
        bestScore = score;
        move = newBoard;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        move = newBoard;
      }
    }
  }

  return {bestScore, move};
}

function prettyPrint(board) {
  var pad = function (text) {
    if (text) {
      return '  ' + text + '  ';
    } else {
      return ' null';
    }
  };

  var i = 0;
  console.log("========Start========");
  for (i; i < 8; i = i + 3) {
    console.log(pad(board[i]) + ' | ' + pad(board[i + 1]) + ' | ' + pad(board[i + 2]));
  }
  console.log("=========End=========");
  console.log();
}

exports.ticTacToe = {
  board: [],
  turn: '',
  result: '',

  createBoard: function () {
    for (var i = 0; i < 9; i++) {
      this.board.push(null);
    }
    return this.board;
  },

  makeMove: function (move) {
    if (this.turn === '') {
      throw Error('Turn value cannot be empty.');
    }
    if (this._isValidMove(move)) {
      this.board[move] = this.turn;
      if (!this.isGameOver()) {
        this._switchTurn();
      }
      return true;
    }
    else {
      return false;
    }
  },

  _isValidMove: function (move) {
    return this.board[move] === null;
  },

  _switchTurn: function () {
    this.turn = this.turn === 'X' ? 'O' : 'X';
  },

  _getNextMove: function () {
    // var empty = this.emptyCells();
    // var move = Math.floor(Math.random() * empty.length);
    // return empty[move];
    var result = minimax(0, this.turn, this.board, false);
    this.board = result.move;
  },

  emptyCells: function () {
    var indxs = [];
    for (var itr = 0; itr < 9; itr++) {
      if (this.board[itr] === null) {
        indxs.push(itr);
      }
    }
    return indxs;
  },

  isGameOver: function () {
    var B = this.board, i;

    //check rows
    for (i = 0; i <= 6; i = i + 3) {
      if (B[i] !== null && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    //check columns
    for (i = 0; i <= 2; i++) {
      if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    //check diagonals
    for (i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
      if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
        this.result = B[i] + " wins!"; //update the state result
        return true;
      }
    }

    var available = this.emptyCells();
    if (available.length == 0) {
      //the game is draw
      this.result = "Draw. But isn't it really losing?"; //update the state result
      return true;
    }
    else {
      return false;
    }
  },

  reset: function () {
    for (var i = 0; i < 9; i++) {
      this.board[i] = null;
    }
    this.turn = 'X';
    this.result = '';
  }
};

