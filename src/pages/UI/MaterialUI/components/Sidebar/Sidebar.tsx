import {WithStyles} from "@material-ui/core";
import {WithRouter} from "api/hoc/passPropertiesAndRender";
import classNames from "classnames";
import { NavLink } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";
// core components
import HeaderLinks from "pages/UI/MaterialUI/components/Header/HeaderLinks";

import sidebarStyle from "assets/jss/material-dashboard-react/components/sidebarStyle";

interface iSidebar {
  classes: any,
  color: any,
  logo: any,
  image: any,
  logoText: any,
  routes: any,
  open: any,
  handleDrawerToggle: any
}

const Sidebar = ({ ...props }: WithStyles<typeof sidebarStyle> & WithRouter & iSidebar) => {
  // verifies if routeName is the one active (in browser input)
  function activeRoute(routeName) {
    return props.location?.pathname?.indexOf(routeName) > -1;
  }
  const { classes, color, logo, image, logoText, routes } = props;

  var links = (
    <List className={classes.list}>
      {routes.map((prop, key) => {
        if (prop.redirect) return null;
        var activePro = " ";
        var listItemClasses;
        if (prop.path === "/upgrade-to-pro") {
          activePro = classes.activePro + " ";
          listItemClasses = classNames({
            [" " + classes[color]]: true
          });
        } else {
          listItemClasses = classNames({
            [" " + classes[color]]: activeRoute(prop.path)
          });
        }
        const whiteFontClasses = classNames({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={activePro + classes.item}
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                {typeof prop.icon === "string" ? (
                  <Icon>{prop.icon}</Icon>
                ) : (
                  <prop.icon />
                )}
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  var brand = (
    <div className={classes.logo}>
      <a href="/" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );

  const mdUp = true // useMediaQuery<any>(theme => theme?.breakpoints.up('md') ?? true);
  const smDown = false // useMediaQuery<any>(theme => theme?.breakpoints.down('sm'));
  return (
    <div>
      {mdUp ? null : <Drawer
          variant="temporary"
          anchor="right"
          open={props.open}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={props.handleDrawerToggle}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>
            <HeaderLinks />
            {links}
          </div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>}

      {smDown ? null :
        <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          {image !== undefined ? (
            <div
              className={classes.background}
              style={{ backgroundImage: "url(" + image + ")" }}
            />
          ) : null}
        </Drawer>}

    </div>
  );
};

export default withStyles(sidebarStyle)(Sidebar);
