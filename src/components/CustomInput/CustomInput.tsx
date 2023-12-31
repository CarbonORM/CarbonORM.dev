import {WithStyles} from "@material-ui/core/styles";
import React, {ReactNode} from "react";
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import customInputStyle from "assets/jss/material-dashboard-react/components/customInputStyle";

interface iCustomInput {
  labelText: ReactNode,
  labelProps: object,
  id: string,
  inputProps: object,
  formControlProps: any,
  error: boolean,
  success: boolean
}


  class CustomInput extends React.Component<WithStyles<typeof customInputStyle> & iCustomInput> {
  render() {
    let {...props} = this.props;
    const {
      classes,
      formControlProps,
      labelText,
      id,
      labelProps,
      inputProps,
      error,
      success
    } = props;

    const labelClasses = classNames({
      [" " + classes.labelRootError]: error,
      [" " + classes.labelRootSuccess]: success && !error
    });
    const underlineClasses = classNames({
      [classes.underlineError]: error,
      [classes.underlineSuccess]: success && !error,
      [classes.underline]: true
    });
    const marginTop = classNames({
      [classes.marginTop]: labelText === undefined
    });
    return (
        <FormControl
            {...formControlProps}
            className={classNames(formControlProps.classes,classes.formControl)}
        >
          {labelText !== undefined ? (
              <InputLabel
                  className={classes.labelRoot + labelClasses}
                  htmlFor={id}
                  {...labelProps}
              >
                {labelText}
              </InputLabel>
          ) : null}
          <Input
              classes={{
                root: marginTop,
                disabled: classes.disabled,
                underline: underlineClasses
              }}
              id={id}
              {...inputProps}
          />
          {error ? (
              <Clear className={classes.feedback + " " + classes.labelRootError}/>
          ) : success ? (
              <Check className={classes.feedback + " " + classes.labelRootSuccess}/>
          ) : null}
        </FormControl>
    );
  }
}


export default withStyles(customInputStyle)(CustomInput);
