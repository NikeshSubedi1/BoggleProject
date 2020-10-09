/*
 * author: Nikesh Subedi
 * SID: @02940867
 */

import findAllSolutions from "./boggle_solver";

// testing Normal Cases
test("Normal Case 3x3", () => {
  const grid = [
    ["X", "E", "E"],
    ["M", "L", "D"],
    ["D", "R", "Y"],
  ];
  const dictionary = ["xml", "deed", "dead", "dry", "meld", "leed"];
  let result = findAllSolutions(grid, dictionary);
  console.log(result);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["dry", "meld", "leed", "xml"]
    .map((v) => v.toLowerCase())
    .sort();
  expect(result).toEqual(solutions);
});

test("Normal Case 4x4", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "D", "E"],
  ];
  const dictionary = ["dredd", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["bee", "dredd", "very"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Normal Case 5x5", () => {
  const grid = [
    ["A", "A", "M", "I", "S"],
    ["N", "J", "W", "N", "J"],
    ["O", "N", "O", "U", "R"],
    ["O", "R", "S", "I", "S"],
    ["E", "Z", "A", "H", "K"],
  ];
  const dictionary = [
    "jam",
    "jaw",
    "anon",
    "snijruiasnooe",
    "kiunizoo",
    "zoo",
    "noun",
    "zebra",
    "aeroplane",
    "plane",
  ];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["jam", "jaw", "anon", "snijruiasnooe", "zoo", "noun"]
    .map((v) => v.toLowerCase())
    .sort();
  expect(result).toEqual(solutions);
});

test("Normal Case 10x10", () => {
  const grid = [
    ["E", "W", "I", "I", "A", "A", "F", "B", "L", "J"],
    ["L", "A", "S", "D", "N", "A", "N", "A", "E", "I"],
    ["T", "E", "O", "W", "Y", "R", "E", "P", "K", "L"],
    ["N", "V", "M", "N", "S", "B", "V", "M", "S", "D"],
    ["N", "K", "L", "A", "Z", "T", "E", "T", "W", "O"],
    ["P", "E", "J", "T", "L", "K", "N", "F", "S", "N"],
    ["M", "S", "V", "M", "B", "A", "F", "N", "A", "N"],
    ["L", "K", "E", "T", "P", "E", "O", "T", "P", "O"],
    ["E", "J", "F", "L", "K", "A", "N", "F", "K", "A"],
    ["F", "A", "G", "A", "G", "K", "J", "P", "A", "T"],
  ];
  const dictionary = [
    "disownment",
    "everywoman",
    "nepal",
    "breakdowns",
    "beagles",
    "blanket",
    "ant",
    "enable",
    "fandom",
    "fever",
    "repeal",
    "velvet",
    "women",
    "easdybtenfonjpat",
    "zebra",
    "jasper",
  ];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [
    "disownment",
    "everywoman",
    "nepal",
    "breakdowns",
    "beagles",
    "blanket",
    "ant",
    "enable",
    "fandom",
    "fever",
    "repeal",
    "velvet",
    "women",
    "easdybtenfonjpat",
  ]
    .map((v) => v.toLowerCase())
    .sort();
  expect(result).toEqual(solutions);
});

// Testing Edge Cases

test("No Solutions Case", () => {
  const grid = [
    ["A", "A", "M", "I", "S"],
    ["N", "J", "W", "N", "J"],
    ["O", "N", "O", "U", "R"],
    ["O", "R", "S", "I", "S"],
    ["E", "Z", "A", "H", "K"],
  ];
  const dictionary = [
    "snijruiesnooe",
    "kiunizoo",
    "zebra",
    "aeroplane",
    "plane",
  ];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Short word case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = [
    "av",
    "va",
    "ad",
    "da",
    "aea",
    "dry",
    "ready",
    "very",
    "acdb",
  ];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["dry", "very"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Used letter usage case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = ["aea", "dry", "ready", "veryr", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["dry"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Duplicate/Palindrome word case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = ["dredd", "bee", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["dredd", "bee", "very"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Empty grid case", () => {
  const grid = [[]];
  const dictionary = ["dredd", "bee", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Empty dictionary case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = [];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Empty grid and dictionary case", () => {
  const grid = [[]];
  const dictionary = [];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("Duplicate word case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D", "E"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = ["dredd", "bee", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["dredd", "bee", "very"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

// Testing Qu

test("Small Qu Case", () => {
  const grid = [
    ["A", "QU"],
    ["C", "D"],
  ];
  const dictionary = ["aqu", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["aqu"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});
test("Normal Qu Case", () => {
  const grid = [
    ["Qu", "E", "R", "Y"],
    ["A", "U", "D", "D"],
    ["D", "E", "B", "D"],
    ["D", "E", "D", "E"],
  ];
  const dictionary = ["queue", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["queue", "bee"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

test("End with Q Case", () => {
  const grid = [
    ["Qu", "E", "R", "Y"],
    ["A", "U", "D", "D"],
    ["D", "E", "B", "D"],
    ["D", "E", "D", "E"],
  ];
  const dictionary = ["queue", "bee", "uaq", "ddaq", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["queue", "bee"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

// Testing Qx
test("Qx Case", () => {
  const grid = [
    ["Qa", "E", "R", "Y"],
    ["A", "U", "D", "D"],
    ["D", "E", "D", "A"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = ["qaud", "bee", "ready", "very", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = ["qaud", "bee"].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});

// Testing Invalid Cases
test("Invalid grid case", () => {
  const grid = [
    ["V", "E", "R", "Y"],
    ["A", "B", "D", "D"],
    ["D", "E", "D"],
    ["D", "E", "B", "E"],
  ];
  const dictionary = ["aea", "dry", "ready", "veryr", "acdb"];
  let result = findAllSolutions(grid, dictionary);
  result = result.map((v) => v.toLowerCase()).sort();
  const solutions = [].map((v) => v.toLowerCase()).sort();
  expect(result).toEqual(solutions);
});
