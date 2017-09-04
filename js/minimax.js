import clone from 'lodash/fp/clone';

/**
 * @todo There is a lot of duplicated code. DRY it up
 * @param board
 * @param isMax
 * @return {{gameOver: boolean, status: string, bestScore: number, board: *}}
 */
function getGameStatus(board, isMax) {
  let B = board,
    i,
    j;
  const result = {
    gameOver: false,
    status: 'None',
    bestScore: isMax ? -2 : 2,
    board
  };

  // check rows
  for (i = 0; i <= 6; i += 3) {
    if (B[i] !== null && B[i] === B[i + 1] && B[i + 1] == B[i + 2]) {
      result.status = `${B[i]} wins!`; // update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  // check columns
  for (i = 0; i <= 2; i++) {
    if (B[i] !== null && B[i] === B[i + 3] && B[i + 3] === B[i + 6]) {
      result.status = `${B[i]} wins!`; // update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  // check diagonals
  for (i = 0, j = 4; i <= 2; i += 2, j -= 2) {
    if (B[i] !== null && B[i] == B[i + j] && B[i + j] === B[i + 2 * j]) {
      result.status = `${B[i]} wins!`; // update the state result
      result.gameOver = true;
      result.bestScore = isMax ? -1 : 1;
      return result;
    }
  }

  const empty = emptyCells(board);
  if (empty.length == 0) {
    // the game is draw
    result.status = "Draw. But isn't it really losing?"; // update the state result
    result.bestScore = 0;
    result.gameOver = true;
    return result;
  }

  return result;
}

/**
 * @deprecated Duplicated code. DRY this up
 * @param board
 * @return {Array}
 */
function emptyCells(board) {
  const available = [];

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      available.push(i);
    }
  }
  return available;
}

function generateBoards(board, player) {
  const possibleBoards = [];
  const empty = emptyCells(board);

  for (let i = 0; i < empty.length; i++) {
    const copy = clone(board);
    copy[empty[i]] = player;
    possibleBoards.push(copy);
  }
  return possibleBoards;
}

function minimax(depth, player, board, isMax) {
  let bestScore = isMax ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
  let move;

  const currentGameStatus = getGameStatus(board, isMax);

  if (currentGameStatus.gameOver) {
    // console.log(currentGameStatus);
    return currentGameStatus;
  }

  const possibleBoards = generateBoards(board, player);

  for (let i = 0; i < possibleBoards.length; i++) {
    const newBoard = possibleBoards[i];
    const score = minimax(depth + 1, isMax ? 'O' : 'X', newBoard, !isMax).bestScore;
    if (isMax) {
      if (score > bestScore) {
        bestScore = score;
        move = newBoard;
      }
    } else if (score < bestScore) {
      bestScore = score;
      move = newBoard;
    }
  }

  return {bestScore, move};
}


export default minimax;
