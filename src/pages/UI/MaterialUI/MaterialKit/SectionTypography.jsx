import React from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons

// core components
import GridContainer from "pages/UI/MaterialUI/components/Grid/GridContainer";
import GridItem from "pages/UI/MaterialUI/components/Grid/GridItem";
import Small from "pages/UI/MaterialUI/components/Typography/Small";
import Danger from "pages/UI/MaterialUI/components/Typography/Danger";
import Warning from "pages/UI/MaterialUI/components/Typography/Warning";
import Success from "pages/UI/MaterialUI/components/Typography/Success";
import Info from "pages/UI/MaterialUI/components/Typography/Info";
import Primary from "pages/UI/MaterialUI/components/Typography/Primary";
import Muted from "pages/UI/MaterialUI/components/Typography/Muted";
import Quote from "pages/UI/MaterialUI/components/Typography/Quote";
import typographyStyle from "assets/jss/material-kit-react/views/componentsSections/typographyStyle";
import image from "assets/img/faces/avatar.jpg";
import PropTypes from "prop-types";


export const SECTION_TYPOGRAPHY = 'SectionTypography/';

class SectionTypography extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <div className={classes.container}>
          <div id="typography">
            <div className={classes.title}>
              <h2>Typography</h2>
            </div>
            <GridContainer>
              <div className={classes.typo}>
                <div className={classes.note}>Header 1</div>
                <h1>The Life of Material Kit</h1>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 2</div>
                <h2>The Life of Material Kit</h2>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 3</div>
                <h3>The Life of Material Kit</h3>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 4</div>
                <h4>The Life of Material Kit</h4>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 5</div>
                <h5>The Life of Material Kit</h5>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 6</div>
                <h6>The Life of Material Kit</h6>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 1</div>
                <h1 className={classes.title}>The Life of Material Kit</h1>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 2</div>
                <h2 className={classes.title}>The Life of Material Kit</h2>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 3</div>
                <h3 className={classes.title}>The Life of Material Kit</h3>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Header 4</div>
                <h4 className={classes.title}>The Life of Material Kit</h4>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Paragraph</div>
                <p>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers. I understand
                  culture. I am the nucleus. I think that’s a responsibility
                  that I have, to push possibilities, to show people, this is
                  the level that things could be at.
                </p>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Quote</div>
                <Quote
                  text="I will be the leader of a company that ends up being worth billions of dollars, because I got the answers. I understand culture. I am the nucleus. I think that’s a responsibility that I have, to push possibilities, to show people, this is the level that things could be at."
                  author=" Kanye West, Musician"
                />
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Muted Text</div>
                <Muted>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Muted>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Primary Text</div>
                <Primary>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Primary>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Info Text</div>
                <Info>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Info>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Success Text</div>
                <Success>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Success>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Warning Text</div>
                <Warning>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Warning>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Danger Text</div>
                <Danger>
                  I will be the leader of a company that ends up being worth
                  billions of dollars, because I got the answers...
                </Danger>
              </div>
              <div className={classes.typo}>
                <div className={classes.note}>Small Tag</div>
                <h2>
                  Header with small subtitle<br />
                  <Small>Use &quot;Small&quot; tag for the headers</Small>
                </h2>
              </div>
            </GridContainer>
          </div>
          <div className={classes.space50} />
          <div id="images">UserProfile.jsx
            <div className={classes.title}>
              <h2>Images</h2>
            </div>
            <br />
            <GridContainer>
              <GridItem xs={12} sm={2}>
                <h4>Rounded Image</h4>
                <img
                  src={image}
                  alt="..."
                  className={classes.imgRounded + " " + classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={12} sm={2} className={classes.marginLeft}>
                <h4>Circle Image</h4>
                <img
                  src={image}
                  alt="..."
                  className={classes.imgRoundedCircle + " " + classes.imgFluid}
                />
              </GridItem>
              <GridItem xs={12} sm={2} className={classes.marginLeft}>
                <h4>Rounded Raised</h4>
                <img
                  src={image}
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRounded +
                    " " +
                    classes.imgFluid
                  }
                />
              </GridItem>
              <GridItem xs={12} sm={2} className={classes.marginLeft}>
                <h4>Circle Raised</h4>
                <img
                  src={image}
                  alt="..."
                  className={
                    classes.imgRaised +
                    " " +
                    classes.imgRoundedCircle +
                    " " +
                    classes.imgFluid
                  }
                />
              </GridItem>
            </GridContainer>
            <GridContainer />
          </div>
          <div className={classes.space50} />
        </div>
      </div>
    );
  }
}


SectionTypography.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(typographyStyle)(SectionTypography);