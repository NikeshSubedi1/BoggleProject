export default function RandomGrid(size) {
  let grid = [];
  const randomChars =
    "AAAABBBCCCCDDDEEEEEEFFFGGGHHIIJJKKLLLLMMMMNNNOOOOPPPQRRRSSSSTTTUUUVVWWWXYZ";
  for (let row = 0; row < size; row++) {
    grid[row] = [];
    for (let col = 0; col < size; col++) {
      grid[row][col] = randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      );
      if (grid[row][col] === "Q") grid[row][col] = "QU";
    }
  }
  return grid;
}
