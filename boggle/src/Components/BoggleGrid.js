import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Tile from "./Tile";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function BoggleGrid(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={0}
      >
        <Grid item xs={"auto"} sm={2} md={3} lg={4} />
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={0}
          >
            {props.grid.map((tileRow, i) =>
              tileRow.map((tileCharacter, j) => (
                <Grid item key={(i + 1) * (j + 1)} xs={2} sm={2} md={2} lg={2}>
                  <Tile onClick={props.onClick} tileContent={tileCharacter} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
        <Grid item xs={"auto"} sm={2} md={3} lg={4} />
      </Grid>
    </div>
  );
}

export default BoggleGrid;
