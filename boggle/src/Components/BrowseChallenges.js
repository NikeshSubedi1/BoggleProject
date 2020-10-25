import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthProvider";
import { Redirect } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";
import firebase from "../firebase";

const useStyles = makeStyles((theme) => ({
  browseheading: {
    "margin-bottom": "1%",
  },
  cards: {
    "margin-bottom": "0.5%",
  },
}));

function BrowseChallenges() {
  const classes = useStyles();
  const [challenges, setChallenges] = useState([]);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchChallenges = async () => {
      const db = firebase.firestore();
      const data = await db.collection("Challenges").get();
      setChallenges(data.docs);
    };
    fetchChallenges();
  }, [challenges]);

  if (!currentUser) {
    return <Redirect to="/" />;
  }
  return (
    <div>
      <Typography variant="h4" className={classes.browseheading}>
        Browse Challenges
      </Typography>
      <Grid container direction="row" alignItems="center" spacing={0}>
        {challenges.map((doc, i) => (
          <Grid key={i} className={classes.browseheading} item xs={4}>
            <ChallengeCard
              name={doc.data().name}
              challengeId={doc.id}
              hscore={doc.data().highscore}
              by={doc.data().By}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default BrowseChallenges;
