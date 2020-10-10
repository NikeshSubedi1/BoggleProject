import { makeStyles, Paper } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  paperRoot1: {
    backgroundColor: "red",
    padding: "8px 12px",
    margin: theme.spacing(1),
  },
  paperRoot2: {
    backgroundColor: "green",
    padding: "8px 12px",
    margin: theme.spacing(1),
  },
}));

function PaperWord(props) {
  const classes = useStyles();
  return (
    <div>
      {props.color === "red" ? (
        <Paper className={classes.paperRoot1}>{props.word}</Paper>
      ) : (
        <Paper className={classes.paperRoot2}>{props.word}</Paper>
      )}
    </div>
  );
}

export default PaperWord;
