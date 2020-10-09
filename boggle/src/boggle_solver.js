/*
 * author: Nikesh Subedi
 * SID: @02940867
 */

/**
 * Creating a node for the Prefix Tree to store the dictionary.
 * @param {string} key - the character in the node
 */
function PrefixTreeNode(key) {
  // key represents the character in the node
  this.key = key;
  // children is the hashmap of the child nodes connected to a node
  this.children = {};
  // isWord represents if the current node is a word in the dictionary
  this.isWord = false;
}

/**
 * Prefix Tree class with the root node
 */
function PrefixTree() {
  this.root = new PrefixTreeNode(null);
}

// Method to insert a word into the prefix tree
/**
 * Recursive method to look for words
 * @param {any} word - word to insert into the prefix tree
 */
PrefixTree.prototype.insert = function (word) {
  if (word.length === 0) {
    return;
  }
  let node = this.root;

  for (let i = 0; i < word.length; i++) {
    // Create new node if node is not found
    if (!node.children[word[i]]) {
      node.children[word[i]] = new PrefixTreeNode(word[i]);
    }
    // Traverse into the tree
    node = node.children[word[i]];
    // Set the isWord Flag to true if it is the end of the word
    if (i === word.length - 1) {
      node.isWord = true;
    }
  }
};

/**
 * Given a Boggle board and a dictionary, returns a list of available words in
 * the dictionary present inside of the Boggle board
 * @param {string[]} grid - The Boggle game board
 * @param {string[]} dictionary - The list of available words
 * @return {string[]} solution - Possible solutions to the Boggle board
 */
const findAllSolutions = function (grid, dictionary) {
  const solver = new Solver(grid, dictionary);
  return solver.getSolutions();
};

/**
 * Solver class to solve the boogle for a given grid and dictionary
 * @param {string[]} grid - The Boggle game board
 * @param {string[]} dictionary - The list of available words
 */
function Solver(grid, dictionary) {
  this.solutions = [];
  this.grid = grid;
  // Creating Prefix Tree from Dictionary
  this.createPrefixTreeFromDictionary(dictionary);
}

/**
 * method to return solutions for a Solver object
 * @return {string[]} array of valid words found in the boogle board
 */
Solver.prototype.getSolutions = function () {
  // Checking for valid grid
  this.gridDimension = this.grid.length;
  for (let i = 0; i < this.gridDimension; i++) {
    if (this.grid[i].length !== this.gridDimension) {
      console.log("Invalid grid");
      return this.solutions;
    }
  }
  // Finding the possible set of words
  this.findWords();
  return [...new Set(this.solutions)];
};

/**
 * Creates a PrefixTree from a list of strings
 * @param {string[]} dictionary - list of valid words to search in boogle board
 */
Solver.prototype.createPrefixTreeFromDictionary = function (dictionary) {
  this.tree = new PrefixTree();
  for (const word of dictionary) {
    if (word.length >= 3) this.tree.insert(word.toLowerCase());
  }
};

/**
 * A method to check whether a index in the grid is safe to visit or not
 * @param {integer} i - ith row of the grid
 * @param {integer} j - jth column of the grid
 * @param {boolean[]} visited - grid that shows if tiles have been visited
 * @return {boolean} whether a tile is safe to visit
 */
Solver.prototype.isSafeToVisit = function (i, j, visited) {
  return (
    i >= 0 &&
    i < this.gridDimension &&
    j >= 0 &&
    j < this.gridDimension &&
    !visited[i][j]
  );
};

/**
 * Starts the recursive call to find words in the grid
 */
Solver.prototype.findWords = function () {
  const currentNode = this.tree.root;
  const currentWord = "";
  for (let i = 0; i < this.gridDimension; i++) {
    for (let j = 0; j < this.gridDimension; j++) {
      const character = this.grid[i][j].toLowerCase();
      const visited = new Array(this.gridDimension)
        .fill(false)
        .map(() => new Array(this.gridDimension).fill(false));
      let characterInPrefixTree = true;
      let tempNode = currentNode;
      let k = 0;
      while (k < character.length && characterInPrefixTree) {
        character[k] in tempNode.children
          ? (tempNode = tempNode.children[character[k]])
          : (characterInPrefixTree = false);
        k++;
      }
      if (characterInPrefixTree) {
        this.searchForWords(tempNode, i, j, visited, currentWord + character);
      }
    }
  }
};

/**
 * Recursive method to look for words
 * @param {PrefixTreeNode} currentNode - current node in the prefix tree
 * @param {integer} i - ith row of the grid
 * @param {integer} j - jth column of the grid
 * @param {boolean[]} visited - grid that shows if tiles have been visited
 * @param {string} currentWord - current word being formed while traversing
 */
Solver.prototype.searchForWords = function (
  currentNode,
  i,
  j,
  visited,
  currentWord
) {
  // Check if current word is a word in the dictionary and check for word length
  if (currentNode.isWord === true && currentWord.length >= 3) {
    this.solutions.push(currentWord);
  }

  // Mark current index in grid as visited
  if (this.isSafeToVisit(i, j, visited)) visited[i][j] = true;

  // check if character is in Prefix tree in clockwise order from the top left
  this.checkTile(currentNode, i - 1, j - 1, visited, currentWord);
  this.checkTile(currentNode, i - 1, j, visited, currentWord);
  this.checkTile(currentNode, i - 1, j + 1, visited, currentWord);
  this.checkTile(currentNode, i, j - 1, visited, currentWord);
  this.checkTile(currentNode, i, j + 1, visited, currentWord);
  this.checkTile(currentNode, i + 1, j - 1, visited, currentWord);
  this.checkTile(currentNode, i + 1, j, visited, currentWord);
  this.checkTile(currentNode, i + 1, j + 1, visited, currentWord);

  // Set current node as not visited before being popped from the stack
  visited[i][j] = false;
};

/**
 * Checks if the current Tile contains word that is in the Prefix Tree
 * @param {PrefixTreeNode} currentNode - current node in the prefix tree
 * @param {integer} i - ith row of the grid
 * @param {integer} j - jth column of the grid
 * @param {boolean[]} visited - grid that shows if tiles have been visited
 * @param {string} currentWord - current word being formed while traversing
 */
Solver.prototype.checkTile = function (
  currentNode,
  i,
  j,
  visited,
  currentWord
) {
  if (this.isSafeToVisit(i, j, visited)) {
    const character = this.grid[i][j].toLowerCase();
    let characterInPrefixTree = true;
    let tempNode = currentNode;
    let k = 0;
    while (k < character.length && characterInPrefixTree) {
      character[k] in tempNode.children
        ? (tempNode = tempNode.children[character[k]])
        : (characterInPrefixTree = false);
      k++;
    }
    if (characterInPrefixTree) {
      this.searchForWords(tempNode, i, j, visited, currentWord + character);
    }
  }
};

export default findAllSolutions;
