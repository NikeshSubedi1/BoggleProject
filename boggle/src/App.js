import React from 'react';
import BoggleGrid from './BoggleGrid'
import Parent from './Grid'
import Grid from "@material-ui/core/Grid";

function App() {
  return (
    <Grid container justify="center" alignItems="center" spacing={2}>
      <Grid item>
    <BoggleGrid />
    </Grid>
    <Grid item>
    <Parent />
    </Grid>
    </Grid>
  );
}

export default App;
