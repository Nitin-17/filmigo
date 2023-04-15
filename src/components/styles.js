import { makeStyles } from "@mui/styles";

export default makeStyles(() => ({
  root: {
    display: "flex",
    height: "100%",
    fontFamily: "Dongle",
  },
  toolbar: {
    height: "70px",
  },
  content: {
    flexFlow: 1,
    padding: "2em",
    width: "100%",
  },
}));
