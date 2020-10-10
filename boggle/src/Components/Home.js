import { Button } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Link to="/Boggle">
      <Button color="primary" variant="contained">
        Play
      </Button>
    </Link>
  );
}

export default Home;
