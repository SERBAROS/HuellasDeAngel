import React,{useEffect,useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/huellas/Admin/NavbarPrincipal.js";
import Sidebar from "components/dashboard/Sidebar/Sidebar.js";

import {UserContext} from './../../contexts/UserContext'
import {HTTP_CONSTANTS} from './../../config/http-constants'
import {requestHttp} from './../../config/http-server'

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/bgblocks.jpg";
import logo from "assets/img/logoHuellas.png";

let ps;
const switchRoutes = (
  <Switch>
    {
    routes.map((prop, key) => {
      if (prop.layout === "/admin") {
       
        return (
          
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/" to="/admin/inicio" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const color = "blue";
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setUserLogged } = useContext(UserContext)

  const autologin = async () => {

    try {
      const endpoint = HTTP_CONSTANTS.autologin
      const response = await requestHttp('post', endpoint)
      const { status, userFound } = response
      if (status === 200) {
        setUserLogged(userFound)
      } else {
        unauthorized()
        
      }
    } catch (err) {
      unauthorized()
    }
  }

  const unauthorized = () => {
    sessionStorage.removeItem('_TOKEN_')
    window.location.href = '/auth/login'
  }

  useEffect(() => {
    autologin()
    return () => {}
    
  }, [])

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  return (
    
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes.filter(route => (route.navbar)) }
        logoText={"Huellas de Angel"}
        logo={logo}
        image={bgImage}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        <Navbar
          routes={routes}
          handleDrawerToggle={handleDrawerToggle}
          {...rest}
        />
        {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
      </div>
    </div>
  
  );
}
