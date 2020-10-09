import React, { useCallback, useState } from "react";
import BoggleGrid from "./Components/BoggleGrid";
import findAllSolutions from "./boggle_solver";
import Grid from "@material-ui/core/Grid";
import WordSubmission from "./Components/WordSubmission";
import RandomGrid from "./RandomGrid";

const tiles = RandomGrid(6);
const dictionary = require("./full-wordlist.json");
const possibleWords = new Set(findAllSolutions(tiles, dictionary.words));
console.log(possibleWords);

function App() {
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const log = useCallback((character) => {
    setCurrentWord((prevWord) => prevWord + character);
  }, []);
  const checkForWord = useCallback((word) => {
    if (possibleWords.has(word)) {
      possibleWords.delete(word);
      setFoundWords((prevWords) => [...prevWords, word]);
    }
    setCurrentWord("");
  }, []);
  return (
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <BoggleGrid grid={tiles} onClick={log} />
      </Grid>
      <Grid item>
        <WordSubmission
          currentWord={currentWord}
          checkWord={checkForWord}
          setCurrentWord={setCurrentWord}
        />
      </Grid>
      <Grid item xs={6} border={1}>
        <h2>Words Found</h2>
        <p>{foundWords}</p>
      </Grid>
    </Grid>
  );
}

export default App;
