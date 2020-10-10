import React, { useCallback, useState } from "react";
import findAllSolutions from "./BoggleComponents/boggle_solver";
import RandomGrid from "./BoggleComponents/RandomGrid";
import WordFound from "./BoggleComponents/WordFound";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Boggle from "./BoggleComponents/Boggle";

const tiles = RandomGrid(6);
const dictionary = require("./BoggleComponents/full-wordlist.json");
const possibleWords = new Set(findAllSolutions(tiles, dictionary.words));
console.log(possibleWords);

function BoggleApp() {
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [boardVisibility, setboardVisibility] = useState(true);
  const [remainingWords, setRemainingWords] = useState([]);

  const update = useCallback((character) => {
    setCurrentWord((prevWord) => prevWord + character);
  }, []);

  const checkForWord = useCallback(
    (word) => {
      if (!foundWords.includes(word)) {
        if (possibleWords.has(word)) {
          setFoundWords((prevWords) => [...prevWords, word]);
        }
      } else {
        setAlertOpen(true);
      }
      setCurrentWord("");
    },
    [foundWords]
  );

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setAlertOpen(false);
  };

  const onStop = () => {
    setboardVisibility(false);
    foundWords.map((word) => possibleWords.delete(word));
    setRemainingWords([...possibleWords].sort());
  };

  return (
    <div>
      {boardVisibility && (
        <Boggle
          tiles={tiles}
          update={update}
          currentWord={currentWord}
          checkForWord={checkForWord}
          setCurrentWord={setCurrentWord}
          onStop={onStop}
        />
      )}
      <WordFound wordsFound={foundWords} wordsRemaining={remainingWords} />

      <Snackbar open={alertOpen} autoHideDuration={4000} onClose={handleClose}>
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleClose}
          severity="warning"
        >
          You have already found the word!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

export default BoggleApp;
