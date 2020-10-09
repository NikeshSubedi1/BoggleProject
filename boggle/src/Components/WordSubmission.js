import React, { useEffect, useRef, useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "80%",
    },
    "& .MuiButton-root": {
      padding: "10px 10px",
      margin: theme.spacing(1),
    },
  },
}));

function WordSubmission(props) {
  const classes = useStyles();
  const textField = useRef(null);
  const [wordValue, setWordValue] = useState("");

  const submit = () => {
    props.checkWord(wordValue.toLowerCase());
    setWordValue("");
  };
  const handleOnChange = (e) => {
    setWordValue(e.target.value);
    props.setCurrentWord(e.target.value);
  };

  useEffect(() => {
    setWordValue(props.currentWord);
    textField.current.focus();
  }, [props.currentWord]);

  return (
    <div className={classes.root}>
      <TextField
        ref={textField}
        label="Word"
        value={wordValue}
        onChange={handleOnChange}
        autoFocus
      />
      <Button variant="contained" color="secondary" onClick={submit}>
        Submit
      </Button>
      <Button variant="contained" color="default" onClick={submit}>
        Stop
      </Button>
    </div>
  );
}

export default WordSubmission;
