/* eslint-disable no-nested-ternary */
import React from "react";
import {
  Button,
  Collapse,
  Drawer as MUIDrawer,
  ListItemButton,
  Toolbar
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import theme from "../../theme";



const MobileDrawer = (props) => {


  const drawerItems = [
    {
      text: "Home",
      hasChildren: false,
      to: "/",
    },
    {
      text: "About",
      hasChildren: false,
      to: "/about",
    },
    {
      text: "What to Invest",
      hasChildren: true,
      to: "",
      children: [
        { title: "Mutual Funds", to: "/service", type: 'mutual-funds', },
        { title: "Forex", to: "/service", type:'forex', },
        { title: "Shares", to: "/service", type: 'shares' },
        { title: "ETFs", to: "/service", type: 'etfs' },
        { title: "Crypto currencies", to: "/service", type: 'crypto' },
        { title: "Commodities", to: "/service", type: 'commodities' },
      ],
    },
    {
      text: "Promotions",
      to: "/",
      hasChildren: false,
    },
    {
      text: "Company",
      hasChildren: true,
      to: "",
      children: [
        { title: "Why Choose Us", to: "/advantages" },
        { title: "Blog", to: "/blog" },
        { title: "Sponsorship", to: "/" },
        { title: "Gallery", to: "/gallery" },
        { title: "Help & FAQs", to: "/faqs" },
      ],
    },
    {
      text: "Contact",
      to: "/contact-us",
      hasChildren: false,
    },
  ];

  const { mobileOpen, setMobileOpen } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const [openAbout, setOpenAbout] = React.useState(false);
  const [openResources, setOpenResources] = React.useState(false);

  const { isAuth } = useSelector(state => state.auth)
  const navigate = useNavigate()

  const handleClick1 = () => {
    setOpenAbout(!openAbout);
  };

  const handleClick2 = () => {
    setOpenResources(!openResources);
  };

  const container =
    props.window !== undefined ? () => window().document.body : undefined;

  const handleListItemClick = (to, index) => {
    navigate(to);
    setSelectedIndex(index);
    setMobileOpen(!mobileOpen);
  };

  const myDrawer = (
    <div
      style={{
        height: "100%",
        width: 225,
        display: "flex",
        flexDirection: "column",
        color: 'white',
        backgroundColor: theme.palette.primary.main,
      }}
    >
     <Toolbar />
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
            return text === "What to Invest" || text === "Company" ? (
              <div key={index}>
                <ListItem
                  style={{ borderRadius: 6 }}
                  button
                  selected={selectedIndex === index}
                  onClick={text === "What to Invest" ? handleClick1 : handleClick2}
                  // onClick={() => handleListItemClick(to, index)}
                >
                  <ListItemText primary={text} />
                  {(text === "What to Invest" ? openAbout : openResources) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={text === "What to Invest" ? openAbout : openResources}
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

      {
        !isAuth &&  <div
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
            color: theme.palette.secondary.main,
            borderColor: theme.palette.secondary.main,
            textTransform: "capitalize",
            marginX: 2,
            fontSize: 12,
          }}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            navigate('/login')
          }}
        >
          Login
        </Button>
        <br />
        <Button
          variant="contained"
          disableElevation
          // endIcon={<ArrowDropDown />}
          sx={{
            backgroundColor: theme.palette.success.main,
            color: "white",
            textTransform: "capitalize",
            fontSize: 12,
            mx: 2,
          }}
          onClick={() => {
            setMobileOpen(!mobileOpen);
            navigate('/signup')
          }}
        >
          Register
        </Button>
      </div>
      }

     
    </div>
  );

  return (
    <MUIDrawer
      variant={props.drawerVariant}
      container={container}
      anchor={props.anchor}
      open={mobileOpen}
      onClose={props.handleDrawerToggle}
      sx={{width: 300}}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      {myDrawer}
    </MUIDrawer>
  );
};

export default MobileDrawer;