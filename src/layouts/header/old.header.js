/* eslint-disable no-nested-ternary */
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/system/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
// import siteLogo from "../../../assets/images/logo.svg";
// import whiteSiteLogo from "../../../assets/images/logo_white.svg";
// import { makeStyles } from "@mui/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
// import { useTheme } from "@mui/styles";
// import "./navbar.css";
import "./nav.css";
import { useSelector } from "react-redux";

import ExpandMore from "@mui/icons-material/ExpandMore";

const pages = [
  {
    title: "Home",
    to: "/",
  },
  {
    title: "About",
    to: "/about",
  },
  {
    title: "Services",
    to: "/services",
  },
  {
    title: "Resources",
    to: "/resources",
  },
  {
    title: "Blog",
    to: "/blog",
  },
  {
    title: "Contact",
    to: "/contact",
  },
];

const resources = [
  { title: "Publications", to: "/resources/publications" },
  { title: "Downloads", to: "/resources/downloads" },
  { title: "Reports", to: "/resources/reports" },
  { title: "Gallery", to: "/resources/gallery" },
  { title: "Research", to: "/resources/research" },
];

const abouts = [
  { title: "About RSPHCMB", to: "/about" },
  { title: "Board of Trustees", to: "/about/bot" },
  { title: "Departments", to: "/about/departments" },
  { title: "Health Authority", to: "/about/lga" },
  { title: "Health Centres", to: "/about/health-centres" },
  { title: "Ward Committees", to: "/about/wdc" },
];

// const settings = ["Profile", "Account", "Dashboard", "Logout"];

// const useStyles = makeStyles((theme) => ({
//   abRoot: {
//     background: "transparent",
//     boxShadow: "none",
//     color: "white",
//   },
//   abScroll: {
//     background: "primary",
//     color: "black",
//     boxShadow: "none",
//   },
//   appBarTransparent: {
//     background: "rgba(255, 255, 255, 0.01)",
//   },
//   appBarSolid: {
//     backgroundColor: "rgba(255, 255, 255)",
//   },
//   solidAppBar: {
//     background: "white",
//     color: "black",
//   },
// }));

// const mTheme = createMuiTheme({});

const MainNavbar = () => {
//   const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

//   const { newServiceData } = useSelector((state) => state.service);

  const [navBackground, setNavBackground] = React.useState("appBarTransparent");
  const [colorSwitch, setColorSwtch] = React.useState("white");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [logo, setLogo] = React.useState("siteLogo");
  const [navColor, setNavColor] = React.useState("black");
  const [blue, setBlue] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navRef = React.useRef();
  navRef.current = navBackground;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

//   React.useEffect(() => {
//     if (
//       location.pathname === "/about" ||
//       location.pathname === "/about/lga" ||
//       location.pathname.startsWith("/about/team/") ||
//       location.pathname === "/about/wdc" ||
//       location.pathname === "/about/bot" ||
//       location.pathname === "/about/health-centres"
//     ) {
//       setBlue(true);
//       setLogo(siteLogo);
//       setNavColor("black");
//     } else if (
//       location.pathname === "/contact" ||
//       location.pathname === "/about/departments" ||
//       location.pathname.startsWith("/about/departments")
//     ) {
//       setBlue(true);
//       setLogo(siteLogo);
//       setNavColor("black");
//     } else if (location.pathname === "/blog") {
//       setLogo(siteLogo);
//       setBlue(true);
//       setNavColor("black");
//     } else if (location.pathname === "/services") {
//       setBlue(true);
//       setLogo(siteLogo);
//       setNavColor("black");
//     } else if (
//       location.pathname.endsWith("LGA") ||
//       location.pathname.startsWith("/resources/gallery") ||
//       location.pathname === "/faqs" ||
//       location.pathname.startsWith("/covid19-vaccin") ||
//       location.pathname.startsWith("/about/team/") ||
//       location.pathname.startsWith("/about/lga/") ||
//       location.pathname === "/about/wdc" ||
//       location.pathname.startsWith("/partner") ||
//       location.pathname === "/resources/research" ||
//       location.pathname.startsWith("/resources/reports") ||
//       location.pathname === "/resources/downloads" ||
//       location.pathname === "/resources/publications" ||
//       location.pathname === "/message-from-perm-sec" ||
//       location.pathname.startsWith("/services/")
//     ) {
//       setBlue(true);
//       setLogo(whiteSiteLogo);
//       setNavColor("white");
//     } else {
//       setBlue(false);
//       setLogo(siteLogo);
//       setNavColor("black");
//     }
//   }, [location]);

//   React.useEffect(() => {
//     const handleScroll = () => {
//       const show = window.scrollY > 150;
//       if (
//         location.pathname.endsWith("LGA") ||
//         location.pathname.startsWith("/resources/gallery") ||
//         location.pathname === "/faqs" ||
//         location.pathname.startsWith("/covid19-vaccin") ||
//         location.pathname.startsWith("/about/lga/") ||
//         location.pathname.startsWith("/about/team/") ||
//         location.pathname === "/about/wdc" ||
//         location.pathname.startsWith("/partner") ||
//         location.pathname === "/resources/research" ||
//         location.pathname.startsWith("/resources/reports") ||
//         location.pathname === "/resources/downloads" ||
//         location.pathname === "/resources/publications" ||
//         location.pathname === "/message-from-perm-sec" ||
//         location.pathname.startsWith("/services/")
//       ) {
//         if (show) {
//           setNavBackground("appBarSolid");
//           setColorSwtch(blue ? "#00B0EF" : "black");
//           setLogo(siteLogo);
//           setNavColor("black");
//         } else {
//           setNavBackground("appBarTransparent");
//           setColorSwtch(blue ? "#00B0EF" : "white");
//           setLogo(whiteSiteLogo);
//           setNavColor("white");
//         }
//       } else {
//         if (show) {
//           if (location.pathname === "/") {
//             setBlue(true);
//           }
//           setNavBackground("appBarSolid");
//           setColorSwtch(blue ? "#00B0EF" : "black");
//           setLogo(siteLogo);
//           setNavColor("black");
//         } else {
//           if (location.pathname === "/") {
//             setBlue(false);
//           }
//           setNavBackground("appBarTransparent");
//           setColorSwtch(blue ? "#00B0EF" : "white");
//           setLogo(siteLogo);
//           setNavColor("black");
//         }
//       }
//     };
//     document.addEventListener("scroll", handleScroll);
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   });

  return (
    <div>
      <AppBar
        color={
          navBackground === "appBarTransparent" ? "transparent" : "inherit"
        }
        id="appbar-id"
        elevation={0}
        sx={{ paddingY: 1 }}
        position="fixed"
        // className={classes[navRef.current]}
      >
        <Container sx={{ paddingX: 2 }}>
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                edge="start"
                // className={classes.menuButton}
                onClick={handleDrawerToggle}
                color="primary"
                aria-label="open drawer"
              >
                <MenuIcon />
              </IconButton>
            </Box>

            <Link to={"/"}>
              <img src={logo} alt="" width="75%" />
            </Link>
            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                marginLeft: 10,
              }}
            >
              {/* <ThemeProvider theme={mTheme}> */}
              {pages.map((page) => (
                <div key={page.to}>
                  {page.title === "Resources" ? (
                    <div className="dropdown">
                      <Button
                        class="dropbtn"
                        endIcon={
                          page.title === "About" ||
                          page.title === "Resources" ? (
                            <ArrowDropDown sx={{ ml: -1 }} />
                          ) : null
                        }
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          color: navColor,
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        // aria-haspopup="true"
                      >
                        {page.title}
                      </Button>
                      <div className="dropdown-content">
                        {resources?.map((elem, index) => (
                          <MenuItem
                            key={index}
                            divider={index !== abouts.length - 1}
                            onClick={(e) => {
                              handleClose();
                              navigate(elem.to);
                            }}
                          >
                            {elem.title}
                          </MenuItem>
                        ))}
                      </div>
                    </div>
                  ) : page.title === "About" ? (
                    <div className="dropdown">
                      <Button
                        class="dropbtn"
                        endIcon={
                          page.title === "About" ||
                          page.title === "Resources" ? (
                            <ArrowDropDown sx={{ ml: -1 }} />
                          ) : null
                        }
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          color: navColor,
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        // aria-haspopup="true"
                      >
                        {page.title}
                      </Button>
                      <div className="dropdown-content">
                        {abouts?.map((elem, index) => (
                          <MenuItem
                            key={index}
                            divider={index !== abouts.length - 1}
                            onClick={(e) => {
                              handleClose();
                              navigate(elem.to);
                            }}
                          >
                            {elem.title}
                          </MenuItem>
                        ))}
                      </div>
                    </div>
                  ) : page.title === "Services" ? (
                    <div className="dropdown">
                      <Button
                        class="dropbtn"
                        endIcon={
                          page.title === "Services" ||
                          page.title === "Resources" ? (
                            <ArrowDropDown sx={{ ml: -1 }} />
                          ) : null
                        }
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          color: navColor,
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        id="basic-button"
                        aria-controls={open ? "basic-menu" : undefined}
                        // aria-haspopup="true"
                      >
                        {page.title}
                      </Button>
                      <div className="dropdown2-content">
                        {2>1 && (
                          <Grid
                            container
                            spacing={{ xs: 0, md: 0 }}
                            columns={{ xs: 4, sm: 8, md: 12 }}
                          >
                            {
                                [1,2,3].map((item, index) => (<Grid item xs={12} sm={4} md={4} key={index} ><Typography>Hello Testing ... </Typography></Grid>))
                            }
                            {/* {newServiceData?.map((item, index) => (
                              <Grid item xs={12} sm={4} md={4} key={index}>
                                {item.items?.length > 0 ? (
                                  <AccordionSection item={item} index={index} />
                                ) : (
                                  <Button
                                    key={index}
                                    variant="text"
                                    sx={{
                                      textTransform: "capitalize",
                                      textAlign: "start",
                                      fontSize: 15,
                                      fontWeight: 500,
                                      color: "black",
                                      marginLeft: 1,
                                    }}
                                    id="basic-button2"
                                    aria-controls={
                                      open ? "basic-menu2" : undefined
                                    }
                                    onClick={() =>
                                      navigate({
                                        pathname: `/services/${  item.title}`,
                                        state: {
                                          title: item.title,
                                        },
                                      })
                                    }
                                  >
                                    {item?.title}
                                  </Button>
                                )}
                              </Grid>
                            ))} */}
                          </Grid>
                        )}
                      </div>
                    </div>
                  ) : page.title === "Blog" ? (
                    <>
                      <Button
                        key={page.title}
                        sx={{
                          color: navColor,
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                        style={{
                          textDecoration: "none",
                        }}
                      >
                        <a
                          href="https://blog.rsphcmb.rv.gov.ng/"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            textDecoration: "none",
                            textTransform: "capitalize",
                            color: navColor,
                          }}
                        >
                          {page.title}
                        </a>
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        // aria-describedby={id}
                        key={page.title}
                        endIcon={
                          page.title === "About" ||
                          page.title === "Resources" ? (
                            <ArrowDropDown />
                          ) : null
                        }
                        onClick={
                          page.title === "Resources" || page.title === "About"
                            ? null
                            : () => navigate(page.to)
                        }
                        sx={{
                          color: navColor,
                          // display: "block",
                          textTransform: "capitalize",
                          fontSize: 15,
                          fontWeight: 600,
                        }}
                      >
                        {page.title}
                      </Button>
                    </>
                  )}

                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      hidden={location.pathname !== page.to}
                      style={{
                        height: 6,
                        width: 6,
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: 3,
                        marginTop: -40,
                      }}
                    />
                  </div>
                </div>
              ))}
              {/* </ThemeProvider> */}
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "none", md: "flex" },
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  backgroundColor: "transparent",
                  color: colorSwitch,
                  borderColor: colorSwitch,
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
                    color: colorSwitch,
                  }}
                >
                  myhealth.ng
                </a>
              </Button>

              <Button
                variant="contained"
                disableElevation
                // endIcon={<ArrowDropDown />}
                sx={{
                  backgroundColor: blue ? "#00B0EF" : "white",
                  color: blue ? "white" : "#0D2344",
                  textTransform: "capitalize",
                  fontSize: 12,
                }}
                onClick={() => navigate("/covid19-vaccination-sites")}
              >
                Covid-19 Vaccination Info
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

const AccordionSection = (props) => {
  const { item, index } = props;

  const [expanded, setExpanded] = React.useState(false);
  const [mItems, setMItems] = React.useState([]);

  React.useEffect(() => {
    if (item) {
      const newArray = [];

      // Declare an empty object
      const uniqueObject = {};

    //   // Loop for the array elements
    //   for (const i in item?.items) {
    //     // Extract the title
    //     const objTitle = item?.items[i]?.title;

    //     // Use the title as the index
    //     uniqueObject[objTitle] = item?.items[i];
    //   }

    //   // Loop to push unique object into array
    //   for (const i in uniqueObject) {
    //     newArray.push(uniqueObject[i]);
    //   }

      const result = newArray.sort((a, b) => a.title.localeCompare(b.title));

      setMItems(result);
    }
  }, [item]);

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

  return (
    <Accordion
      key={index}
      disableGutters
      elevation={0}
      sx={{
        marginY: 0,
        padding: 0,
      }}
      expanded={expanded === `panel${  index}`}
    //   onChange={handleChange(`panel${  index}`)}
    >
      <AccordionSummary
        sx={{ backgroundColor: "transparent" }}
        expandIcon={<ExpandMore />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Typography
          fontSize={15}
          fontWeight={"500"}
          textAlign="start"
          textTransform="capitalize"
        >
          {item.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {mItems && (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="start"
            alignItems="start"
            padding={0}
          >
            {mItems?.map((elem, index) => (
              <Link
                style={{
                  padding: 3,
                  fontSize: 14,
                  color: "#00B0EF",
                }}
                to={{
                  pathname: `/services/${  elem?.title?.replaceAll("/", "")}`,
                  state: {
                    item: elem,
                    image: item?.image,
                  },
                }}
              >
                {elem?.title}
              </Link>
            ))}
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
export default MainNavbar;