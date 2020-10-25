import React, { useCallback, useContext, useEffect, useState } from "react";
import WordFound from "./BoggleComponents/WordFound";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import Boggle from "./BoggleComponents/Boggle";
import firebase from "../firebase";
import { AuthContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";
import findAllSolutions from "./BoggleComponents/boggle_solver";

const db = firebase.firestore();

function ChallengeBoggle(props) {
  const { currentUser } = useContext(AuthContext);

  const { match } = props;
  const { params } = match;
  const { challengeId } = params;

  const [tiles, setChallengeTiles] = useState([]);
  const [possibleWords, setPossibleWords] = useState(new Set([]));
  const [highscore, setHighscore] = useState(0);
  const [currentWord, setCurrentWord] = useState("");
  const [foundWords, setFoundWords] = useState([]);
  const [alertOpen, setAlertOpen] = useState(false);
  const [boardVisibility, setboardVisibility] = useState(true);
  const [remainingWords, setRemainingWords] = useState([]);

  useEffect(() => {
    const fetchChallenge = async () => {
      const tiledata = await db.collection("Challenges").doc(challengeId).get();

      const newArr = [];
      const arr = tiledata.data().tiles;
      while (arr.length) newArr.push(arr.splice(0, 6));
      setChallengeTiles(newArr);

      const hscore = tiledata.data().highscore;
      setHighscore(hscore);

      const dictionary = require("./BoggleComponents/full-wordlist.json");
      const wordsPossible = new Set(findAllSolutions(newArr, dictionary.words));
      console.log(wordsPossible);
      setPossibleWords(wordsPossible);
    };
    fetchChallenge();
  }, []);

  useEffect(() => {
    if (foundWords.length > highscore) {
      db.collection("Challenges")
        .doc(challengeId)
        .update({ highscore: foundWords.length, By: currentUser.displayName });
    }
  }, [foundWords]);

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
    [foundWords, possibleWords]
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
  if (!currentUser) {
    return <Redirect to="/" />;
  }
  if (tiles === undefined) {
    return <h1>Error!</h1>;
  }
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

export default React.memo(ChallengeBoggle);
