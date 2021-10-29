import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { GitHub, LinkedIn } from "@material-ui/icons";
import { primary, secondary } from "../utils/colors";

const useStyles = makeStyles({
  bottomNavContainer: {
    background: "#222",
  },
  root: {
    "& .MuiSvgIcon-root": {
      fill: secondary,
      "&:hover": {
        fill: primary,
        fontSize: "1.8rem",
      },
    },
  },
});

const Footer = () => {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.bottomNavContainer}>
      <BottomNavigationAction
        icon={<LinkedIn />}
        target="_blank"
        href="https://www.linkedin.com/in/williamcougan/"
        className={classes.root}
      />
      <BottomNavigationAction
        icon={<GitHub />}
        className={classes.root}
        target="_blank"
        href="https://github.com/billycougz"
      />
    </BottomNavigation>
  );
};
export default Footer;
