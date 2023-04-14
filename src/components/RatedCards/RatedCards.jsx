import React from "react";
import { Typography, Box } from "@mui/material";

import useStyles from "./styles";
import { Movie } from "..";

const RatedCards = ({ title, data }) => {
  const classes = useStyles();
  console.log("Helloe there");
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <div className={classes.conatiner}>
        {data?.results?.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </div>
    </Box>
  );
};

export default RatedCards;
