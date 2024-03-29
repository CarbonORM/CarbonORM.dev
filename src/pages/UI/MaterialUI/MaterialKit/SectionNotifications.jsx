import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Check from "@material-ui/icons/Check";
import Warning from "@material-ui/icons/Warning";
// core components
import SnackbarContent from "pages/UI/MaterialUI/components/Snackbar/SnackbarContent";
import Clearfix from "pages/UI/MaterialUI/components/Clearfix/Clearfix";
import notificationsStyles from "assets/jss/material-kit-react/views/componentsSections/notificationsStyles";
import Info from "@material-ui/icons/Info";
import ErrorRounded from "@material-ui/icons/ErrorRounded";
import PropTypes from "prop-types";


export const SECTION_NOTIFICATIONS = 'SectionNotifications/';

class SectionNotifications extends React.Component {
  render() {
    const { classes } = this.props;
    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <div className={classes.title}>
                    <h3>Notifications</h3>
                </div>
            </div>
            <SnackbarContent
                message={
                    <span>
              <b>INFO ALERT:</b> You&apos;ve got some friends nearby, stop looking at
              your phone and find them...
            </span>
                }
                close
                color="info"
                icon={Info}
            />
            <SnackbarContent
                message={
                    <span>
              <b>SUCCESS ALERT:</b> You&apos;ve got some friends nearby, stop looking
              at your phone and find them...
            </span>
                }
                close
                color="success"
                icon={Check}
            />
            <SnackbarContent
                message={
                    <span>
              <b>WARNING ALERT:</b> You&apos;ve got some friends nearby, stop looking
              at your phone and find them...
            </span>
                }
                close
                color="warning"
                icon={Warning}
            />
            <SnackbarContent
                message={
                    <span>
              <b>DANGER ALERT:</b> You&apos;ve got some friends nearby, stop looking
              at your phone and find them...
            </span>
                }
                close
                color="danger"
                icon={ErrorRounded}
            />
            <Clearfix />
        </div>
    );
  }
}


SectionNotifications.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(notificationsStyles)(SectionNotifications);
