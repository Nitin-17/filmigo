/* eslint-disable no-unused-vars */
import React from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import useStyles from "./styles";

import { Actors, Movies, MovieInformation, Profile, Navbar } from "./index";

const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline>
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route exact path="/" element={<h1>Home Page</h1>} />
            <Route
              exact
              path="/movie/:id"
              element={<h1>Movie Information</h1>}
            />
            <Route
              exact
              path="/actors/:id"
              element={<h1>Actor Information Page</h1>}
            />
            <Route exact path="/profile/:id" element={<h1>Profile Page</h1>} />
          </Routes>
        </main>
      </CssBaseline>
    </div>
  );
};

export default App;
