import React from "react";
import { withStyles } from '@material-ui/core/styles';
import Grid from "@material-ui/core/Grid";
import Tile from "./Tile";

const tiles = ["E", "L", "M", "C", "P", "J", "M", "I", "W",
 "O", "S", "P", "W", "U", "D", "R", "R", "J", "L", "F", "M", "S", 
 "L", "J", "L", "R", "J", "U", "P", "Qu", "A", "K", "R", "L", "E", "Y"];


 const useStyles =  theme => ({
     root: {
       '& .MuiTextField-root': {
         margin: theme.spacing(1),
         width: '25ch',
       },
     },
   });


class BoggleGrid extends React.Component {
  render(){
  return (
    <div>
       <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
        <Grid item xs={0} sm={2} md ={3} lg ={4}/>
        <Grid item xs ={12} sm = {8} md={6} lg ={4}>
        <Grid container direction="row" justify="center" alignItems="center" spacing={0}>
              {
              tiles.map((tilenumber,i)=>(
                <Grid item key ={i} xs={2} sm={2} md ={2} lg={2}>
                  <Tile tileContent={tilenumber}/>
                </Grid>
              ))
              }
        </Grid>
        </Grid>
        <Grid item xs={0} sm={2} md = {3} lg ={4}/>
      </Grid>
    </div>
    );
  }
}

export default withStyles(useStyles)(BoggleGrid);
