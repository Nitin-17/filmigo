import React, { useContext, useEffect, useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Avatar,
  Button,
  useMediaQuery,
} from "@mui/material";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";

import useStyles from "./styles";
import Sidebar from "../Sidebar/Sidebar";
import Search from "../Search/Search";
import { fetchToken, moviesApi, createSessionId } from "../../utils";
import { setUser, userSelector } from "../../features/auth";
import { ColorModeContext } from "../../utils/ToggleColorMode";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(userSelector);
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("request_token");
  const sessionIdLocal = localStorage.getItem("session_id");

  const colorMode = useContext(ColorModeContext);

  useEffect(() => {
    const logInUser = async () => {
      if (token) {
        if (sessionIdLocal) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdLocal}`
          );
          dispatch(setUser(userData));
        } else {
          const sessionId = await createSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );

          dispatch(setUser(userData));
        }
      }
    };

    logInUser();
  }, [token]);

  console.log("Authentication", isAuthenticated);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            // eslint-disable-next-line react/destructuring-assignment
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp;
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>

          {isMobile && <Search />}
        </Toolbar>
      </AppBar>

      {/* This is a side bar */}
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.drawerbackground}
              classes={{ paper: classes.drawerpaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawerpaper }}
              variant="permanent"
              open
              PaperProps={{ style: { width: "14%" } }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
