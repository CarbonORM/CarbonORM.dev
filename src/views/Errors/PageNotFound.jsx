import React from "react";
import PropTypes from "prop-types";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import Error from "@material-ui/icons/Error";

import errorPageStyle from "assets/jss/material-dashboard-react/views/errorPageStyles.jsx";

function PageNotFound() {

    // we use this to make the card to appear after the page has been rendered
    const { classes } = this.props;
    return (
      <div className={classes.content}>
        <form>
          <Card
            profile
            className={
              classes.customCardClass
            }
          >
            <CardHeader color="info" icon>
              <CardIcon color="info">
                <Error />
              </CardIcon>
            </CardHeader>
            <CardBody profile>
              <br />
              <h4 className={classes.cardTitle}>Error 404 - Page not Found</h4>
            </CardBody>
            <CardFooter className={classes.justifyContentCenter} />
          </Card>
        </form>
      </div>
    );

}

PageNotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(errorPageStyle)(PageNotFound);