import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";

import completedStyle from "assets/jss/material-kit-react/views/componentsSections/completedStyle";
import PropTypes from "prop-types";

class SectionCompletedExamples extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <h2>Completed with examples</h2>
              <h4>
                The kit comes with three pre-built pages to help you get started
                faster. You can change the text and images and you&apos;re good to
                go. More importantly, looking at them will give you a picture of
                what you can build with this powerful kit.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

SectionCompletedExamples.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(completedStyle)(SectionCompletedExamples);
