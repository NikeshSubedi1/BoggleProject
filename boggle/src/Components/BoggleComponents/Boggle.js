import { Grid } from "@material-ui/core";
import React from "react";
import BoggleGrid from "./BoggleGrid";
import WordSubmission from "./WordSubmission";

function Boggle(props) {
  return (
    <div>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item>
          <BoggleGrid grid={props.tiles} onClick={props.update} />
        </Grid>
        <Grid item>
          <WordSubmission
            currentWord={props.currentWord}
            checkWord={props.checkForWord}
            setCurrentWord={props.setCurrentWord}
            onStop={props.onStop}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default Boggle;
