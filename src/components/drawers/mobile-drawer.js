/* eslint-disable no-nested-ternary */
import React from "react";
import {
  Button,
  Collapse,
  Drawer as MUIDrawer,
  ListItemButton,
  
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
// import { makeStyles} from "@mui/styles"

const drawerWidth = 270;
// const useStyles = makeStyles((theme) => ({
//   drawer: {
//     width: "275px",
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   toolbar: theme.mixins.toolbar,
//   listRoot: {
//     width: "100%",
//     padding: theme.spacing(1),
//   },
// }));

const MobileDrawer = (props) => {
//   const classes = useStyles();

  const drawerItems = [
    {
      text: "Home",
      hasChildren: false,
      to: "/",
    },
    {
      text: "About",
      hasChildren: true,
      to: "",
      children: [
        { title: "About RSPHCMB", to: "/about" },
        { title: "Board of Trustees", to: "/about/bot" },
        { title: "Departments", to: "/about/departments" },
        { title: "Health Authority", to: "/about/lga" },
        { title: "Health Centres", to: "/about/health-centres" },
        { title: "Ward Committees", to: "/about/wdc" },
      ],
    },
    {
      text: "Services",
      to: "/services",
      hasChildren: false,
    },
    {
      text: "Resources",
      hasChildren: true,
      to: "",
      children: [
        { title: "Publications", to: "/resources/publications" },
        { title: "Downloads", to: "/resources/downloads" },
        { title: "Reports", to: "/resources/reports" },
        { title: "Gallery", to: "/resources/gallery" },
        { title: "Research", to: "/resources/research" },
      ],
    },
    {
      text: "Blog",
      to: "",
      hasChildren: false,
    },
    {
      text: "Contact",
      to: "/contact",
      hasChildren: false,
    },
  ];

  const { mobileOpen, setMobileOpen } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [openAbout, setOpenAbout] = React.useState(false);
  const [openResources, setOpenResources] = React.useState(false);

  const handleClick1 = () => {
    setOpenAbout(!openAbout);
  };

  const handleClick2 = () => {
    setOpenResources(!openResources);
  };

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  const handleListItemClick = (to, index) => {
    // history.push(to);
    setSelectedIndex(index);
    setMobileOpen(!mobileOpen);
  };

  const myDrawer = (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <div
        className={classes.toolbar}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <a href="/">
          <img src={logo} style={{ width: 100 }} alt="site logo" />
        </a>
      </div> */}

      <Divider />
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <List
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {drawerItems?.map((item, index) => {
            const { text, to, children } = item;
            return text === "About" || text === "Resources" ? (
              <div key={index}>
                <ListItem
                  style={{ borderRadius: 6 }}
                  button
                  selected={selectedIndex === index}
                  onClick={text === "About" ? handleClick1 : handleClick2}
                  // onClick={() => handleListItemClick(to, index)}
                >
                  <ListItemText primary={text} />
                  {(text === "About" ? openAbout : openResources) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={text === "About" ? openAbout : openResources}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {children?.map((it, ke) => {
                      const { title, to } = it;
                      return (
                        <ListItemButton
                          key={ke}
                          sx={{ pl: 4 }}
                          selected={selectedIndex === index}
                          onClick={() => handleListItemClick(to, index)}
                        >
                          <ListItemText primary={title} />
                        </ListItemButton>
                      );
                    })}
                  </List>
                </Collapse>
              </div>
            ) : text === "Blog" ? (
              <ListItem
                button
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(to, index)}
              >
                <a
                  href="http://rsphcmb.xyz/blog"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: "none",
                    textTransform: "capitalize",
                    color: "inherit",
                  }}
                >
                  {text}
                </a>
              </ListItem>
            ) : (
              <ListItem
                style={{ borderRadius: 6 }}
                button
                key={index}
                selected={selectedIndex === index}
                onClick={() => handleListItemClick(to, index)}
              >
                <ListItemText primary={text} />
              </ListItem>
            );
          })}
        </List>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "stretch",
          height: "50%",
          width: "75%",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            backgroundColor: "transparent",
            color: "#00B0EF",
            borderColor: "#00B0EF",
            textTransform: "capitalize",
            marginX: 2,
            fontSize: 12,
          }}
        >
          <a
            href="https://myhealth.ng"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              textTransform: "lowercase",
              color: "#00B0EF",
            }}
          >
            myhealth.ng
          </a>
        </Button>
        <br />
        <Button
          variant="contained"
          disableElevation
          // endIcon={<ArrowDropDown />}
          sx={{
            backgroundColor: "#00B0EF",
            color: "white",
            textTransform: "capitalize",
            fontSize: 12,
            mx: 2,
          }}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            // history.push("/covid19-vaccination-sites");
          }}
        >
          Covid-19 Vaccination Info
        </Button>
      </div>
    </div>
  );

  return (
    <MUIDrawer
      variant={props.drawerVariant}
      container={container}
      anchor={props.anchor}
      open={mobileOpen}
      onClose={props.handleDrawerToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {myDrawer}
    </MUIDrawer>
  );
};

export default MobileDrawer;