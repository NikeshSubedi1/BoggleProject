import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function Tile(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => props.onClick(props.tileContent)}
        fullWidth
      >
        {props.tileContent}
      </Button>
    </div>
  );
}

export default React.memo(Tile);
