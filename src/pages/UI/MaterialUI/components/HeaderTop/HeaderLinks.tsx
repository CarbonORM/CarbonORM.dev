/*eslint-disable*/
import CarbonORM from "CarbonORM";
import {ADMIN_LTE} from "pages/UI/AdminLTE";
import React from "react";
// react components for routing our app without refresh
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import {Add, Apps, CloudDownload, NightsStay, Remove, WbSunny} from "@material-ui/icons";
// core components
import CustomDropdown from "pages/UI/MaterialUI/components/CustomDropdown/CustomDropdown";
import Button from "pages/UI/MaterialUI/components/CustomButtons/Button";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle";
import {switchDarkAndLightTheme} from "state/ui";
import {MATERIAL_DASHBOARD, UI} from "pages/UI/MaterialDashboard";
import {MATERIAL_KIT} from "pages/UI/MaterialKit";


class HeaderLinks extends React.Component<{ classes: any }, { zoom: number }> {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 100,
        };
        this.zoom = this.zoom.bind(this);
        document.body.style.overflowX = 'hidden';
    }

    zoom(operator) {
        switch (operator) {
            case "+":

                this.setState({
                    zoom: this.state.zoom + 10
                }, () => {
                    // @ts-ignore
                    document.body.style.zoom = this.state.zoom + "%"
                });
                break;
            case "-":
                this.setState({
                    zoom: this.state.zoom - 10
                }, () => {
                    // @ts-ignore
                    document.body.style.zoom = this.state.zoom + "%"
                });
                break;
            default:
                // @ts-ignore
                document.body.style.zoom = this.state.zoom + "%"
        }
    }


    render() {
        const {classes} = this.props;
        const { darkMode} = CarbonORM.instance.state;

        return (
            <List className={classes.list}>
                <ListItem className={classes.listItem}>
                    <Button
                        onClick={() => this.zoom('+')}
                        color="transparent"
                        target="_blank"
                        className={classes.navLink}
                        style={{color: (darkMode ? "white" : "black")}}
                    >
                        <Add className={classes.icons}/>
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        onClick={() => this.zoom('-')}
                        color="transparent"
                        target="_blank"
                        className={classes.navLink}
                        style={{color: (darkMode ? "white" : "black")}}
                    >
                        <Remove className={classes.icons}/>
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        onClick={() => switchDarkAndLightTheme()}
                        color="transparent"
                        target="_blank"
                        className={classes.navLink}
                        style={{color: (darkMode ? "white" : "black")}}
                    >
                        {darkMode
                            ? <><WbSunny className={classes.icons}/></>
                            : <><NightsStay className={classes.icons}/></>
                        }
                    </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                    <CustomDropdown
                        noLiPadding
                        buttonText="UI"
                        buttonProps={{
                            className: classes.navLink,
                            color: "transparent"
                        }}
                        darkMode={darkMode}
                        buttonIcon={Apps}
                        dropdownList={[
                            <Link to={'/' + UI + MATERIAL_KIT}
                                  target="_blank"
                                  className={classes.dropdownLink}>
                                Material Kit
                            </Link>,
                            <Link to={'/' + UI + MATERIAL_DASHBOARD}
                                  target="_blank"
                                  className={classes.dropdownLink}>
                                Material Dashboard
                            </Link>,
                            <Link to={'/' + UI + ADMIN_LTE}
                                  target="_blank"
                                  className={classes.dropdownLink}>
                                AdminLTE
                            </Link>
                        ]}
                    />
                </ListItem>
                <ListItem className={classes.listItem}>
                    <Button
                        href="https://github.com/RichardTMiles/CarbonPHP"
                        color="transparent"
                        target="_blank"
                        className={classes.navLink}
                        style={{color: (darkMode ? "white" : "black")}}
                    >
                        <CloudDownload className={classes.icons}/> GitHub
                    </Button>
                </ListItem>
            </List>
        );
    }

    /**
     <ListItem className={classes.listItem}>
     <Tooltip
     id="instagram-tooltip"
     title="Follow us on instagram"
     placement={window.innerWidth > 959 ? "top" : "left"}
     classes={{tooltip: classes.tooltip}}
     >
     <Button
     color="transparent"
     href="https://www.instagram.com/wookieetyler/"
     target="_blank"
     className={classes.navLink}
     >
     <i className={classes.socialIcons + " fab fa-instagram"}/> &nbsp;
     </Button>
     </Tooltip>
     </ListItem>
     **/
}

export default withStyles(headerLinksStyle)(HeaderLinks);
