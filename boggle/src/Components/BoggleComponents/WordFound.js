import { Grid, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import PaperWord from "./PaperWord";

function WordFound(props) {
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    if (props.wordsRemaining.length !== 0) {
      setShowWords(true);
    }
  }, [props.wordsRemaining]);
  return (
    <div>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12} sm={8}>
          <Typography variant="h5">
            Words Found:
            {showWords &&
              `  ${props.wordsFound.length}/${
                props.wordsRemaining.length + props.wordsFound.length
              }`}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Grid container>
            {props.wordsFound.map((currWord, i) => (
              <PaperWord key={i} word={currWord} color="green" />
            ))}
            {props.wordsRemaining.map((currWord, i) => (
              <PaperWord
                key={i + props.wordsFound.length}
                word={currWord}
                color="red"
              />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default WordFound;
