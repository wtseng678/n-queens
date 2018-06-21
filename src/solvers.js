/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*Deprecated code

var findRookSolution = function(board, start, cb) { // O(n^2) time
  if (start === board.get('n')) {
    return cb(board);
  }
  for (var i = 0; i < board.get('n'); i++) {
    board.togglePiece(start, i);
    if (!board.hasAnyRooksConflicts()) {
      var result = findRookSolution(board, start + 1, cb);
      if (result) {
        return result; 
      }
    }
    board.togglePiece(start, i);
  }
};

var findQueenSolution = function(board, start, cb) { // O(n^2) time
  if (start === board.get('n')) {
    return cb(board);
  }
  for (var i = 0; i < board.get('n'); i++) {
    board.togglePiece(start, i);
    if (!board.hasAnyQueensConflicts()) {
      var result = findQueenSolution(board, start + 1, cb);
      if (result) {
        return result;
      }
    }
    board.togglePiece(start, i);
  }
};

var findNSolution = function(n, piece) { // O(n^2) time
  var board = new Board({n: n});
  var solution = board.rows();
  findSolution(board, 0, function(board) { return solution = board.rows(); }, piece === 'rook' ? board.hasAnyRooksConflicts.bind(board) : board.hasAnyQueensConflicts.bind(board));
  console.log('Single solution for ' + n + ' ' + piece + 's:', JSON.stringify(solution));
  return solution;
};


var countNSolutions = function(n, piece) { // O(n^2) time
  var solutionCount = 0;
  var board = new Board({n: n});
  findSolution(board, 0, function(board) { solutionCount++; }, piece === 'rook' ? board.hasAnyRooksConflicts.bind(board) : board.hasAnyQueensConflicts.bind(board));
  console.log('Number of solutions for ' + n + ' ' + piece + 's:', solutionCount);
  return solutionCount;
};

*/

var findSolution = function(board, start, cb, anyConflict) { // O(n^2) time
  if (start === board.get('n')) {
    return cb(board);
  }
  for (var i = 0; i < board.get('n'); i++) {
    board.togglePiece(start, i);
    if (!anyConflict()) {
      var result = findSolution(board, start + 1, cb, anyConflict);
      if (result) {
        return result;
      }
    } 
    board.togglePiece(start, i);
  }
};

window.findNRooksSolution = function(n) { // O(n^2) time
  /*Deprecated code
  var board = new Board({n: n});
  var solution = board.rows();
  findSolution(board, 0, function(board) { return solution = board.rows(); }, board.hasAnyRooksConflicts.bind(board));
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;*/
  //return findNSolution(n, 'rook');
  return findOrCount(n, 'find', 'rook');
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) { // O(n^2) time
  /*Deprecated code
  var board = new Board({n: n});
  var solution = board.rows();
  findSolution(board, 0, function(board) { return solution = board.rows(); }, board.hasAnyQueensConflicts.bind(board));
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));*/
  //return findNSolution(n, 'queen');
  return findOrCount(n, 'find', 'queen');
};

var findOrCount = function(n, type, piece) {
  var board = new Board({n: n});
  var solution = type === 'find' ? board.rows() : 0;
  findSolution(board, 0, type === 'find' ? function(board) { return solution = board.rows(); } : function(board) { solution++; }, piece === 'rook' ? board.hasAnyRooksConflicts.bind(board) : board.hasAnyQueensConflicts.bind(board));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) { // O(n^2) time
  /*Deprecated code
  var solutionCount = 0;
  var board = new Board({n: n});
  findSolution(board, 0, function(board) { solutionCount++; }, board.hasAnyRooksConflicts.bind(board));
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;*/
  //return countNSolutions(n, 'rook');
  return findOrCount(n, 'count', 'rook');
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) { // O(n^2) time
  /*Deprecated code
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  findSolution(board, 0, function(board) { solutionCount++; }, board.hasAnyQueensConflicts.bind(board));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;*/
  //return countNSolutions(n, 'queen');
  return findOrCount(n, 'count', 'queen');
};
