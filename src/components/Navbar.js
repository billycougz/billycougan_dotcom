import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Menu from "@material-ui/icons/Menu";
import AssignmentInd from "@material-ui/icons/AssignmentInd";
import Home from "@material-ui/icons/Home";
import Apps from "@material-ui/icons/Apps";
import { makeStyles } from "@material-ui/core/styles";
import Footer from "../components/Footer";
import { primary, secondary } from "../utils/colors";
import { LinkedIn } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appbar: {
    background: "#222",
    margin: 0,
  },
  menuIcon: {
    color: secondary,
  },
  title: {
    color: secondary,
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  titlep2: {
    fontWeight: "100",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  menuSliderContainer: {
    width: 250,
    background: "#222",
    height: "100%",
  },
  avatar: {
    margin: "0.5rem auto",
    width: theme.spacing(13),
    height: theme.spacing(13),
    backgroundColor: primary,
    fontSize: "3rem",
  },
  listItem: {
    color: secondary,
    "&:hover": {
      backgroundColor: primary,
      color: secondary,
    },
  },
}));

const menuItems = [
  { listIcon: <Home />, listText: "Home", listPath: "/" },
  {
    listIcon: <LinkedIn />,
    listText: "LinkedIn",
    href: "//www.linkedin.com/in/williamcougan/",
  },
  {
    listIcon: <AssignmentInd />,
    listText: "Resume",
    listPath: "/resume",
    hidden: true,
  },
  {
    listIcon: <Apps />,
    listText: "Portfolio",
    listPath: "/portfolio",
    hidden: true,
  },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  const sideList = () => (
    <Box className={classes.menuSliderContainer} component="div">
      <Avatar className={classes.avatar} alt="William Cougan">
        WC
      </Avatar>
      <Divider />
      <List>
        {menuItems
          .filter((item) => !item.hidden)
          .map((item, i) => (
            <ListItem
              button
              key={i}
              className={classes.listItem}
              onClick={() => setOpen(false)}
              component={Link}
              target={item.href && "_blank"}
              to={item.listPath || item.href}
            >
              <ListItemIcon className={classes.listItem}>
                {item.listIcon}
              </ListItemIcon>
              <ListItemText primary={item.listText} />
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <Box component="nav">
        <AppBar position="static" className={classes.appbar}>
          <Toolbar>
            <IconButton onClick={() => setOpen(true)}>
              {true && <Menu className={classes.menuIcon} />}
            </IconButton>
            <Typography variant="h5" className={classes.title}>
              William Cougan{" "}
              <span className={classes.titlep2}>| Software Engineer</span>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Drawer open={open} anchor="right" onClose={() => setOpen(false)}>
        {sideList()}
        <Footer />
      </Drawer>
    </React.Fragment>
  );
};

export default Navbar;
