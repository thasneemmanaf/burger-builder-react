import React, { Component } from "react";
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as authActions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";

class Auth extends Component {
  state = {
    controls: {
      Email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        hasTouched: false,
      },
      Password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        hasTouched: false,
      },
    },
  };

  // to check validity of form fields
  checkValidity = (value, rule) => {
    let isValid = true;
    if (rule.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rule.minLength) {
      isValid = value.length >= rule.minLength && isValid;
    }
    if (rule.maxLength) {
      isValid = value.length <= rule.maxLength && isValid;
    }
    return isValid;
  };

  // to read the input values from data form
  inputChangeHandler = (event, elementID) => {
    const updatedControls1 = { ...this.state.controls };

    const updatedControls2 = { ...updatedControls1[elementID] };

    updatedControls2.hasTouched = true;
    updatedControls2.value = event.target.value;
    updatedControls2.valid = this.checkValidity(
      updatedControls2.value,
      updatedControls2.validation
    );
    updatedControls1[elementID] = updatedControls2;

    // to check if form is valid
    let isFormValid = true;
    for (let key in updatedControls1) {
      isFormValid = updatedControls1[key].valid && isFormValid;
    }

    this.setState({ controls: updatedControls1, isFormValid: isFormValid });
  };

  // to authenticate the form when submitting
  signUpHandler = (event) => {
    event.preventDefault();

    this.props.onSignUp(
      this.state.controls.Email.value,
      this.state.controls.Password.value
    );
  };

  signInHandler = () => {
    this.props.onSignIn(
      this.state.controls.Email.value,
      this.state.controls.Password.value
    );
  };

  render() {
    const formDataArray = [];
    for (let key in this.state.controls) {
      formDataArray.push({ id: key, config: this.state.controls[key] });
    }

    let errorMessage = this.props.errorMessage ? (
      <p>{this.props.errorMessage}</p>
    ) : null;

    let formElement = (
      <div>
        <form onSubmit={this.signUpHandler}>
          {formDataArray.map((item) => {
            return (
              <Input
                clicked={(event) => {
                  return this.inputChangeHandler(event, item.id);
                }}
                key={item.id}
                inValid={!item.config.valid}
                shouldValidate={item.config.validation}
                touched={item.config.hasTouched}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
              ></Input>
            );
          })}

          <Button btnType="Success">SIGNUP</Button>
        </form>

        <Button btnType="Danger" btnOperation={this.signInHandler}>
          SIGNIN
        </Button>
      </div>
    );
    if (this.props.loading) {
      formElement = <Spinner />;
    }
    const redirectElement = <Redirect to="/" />;
    return (
      <div className={classes.Auth}>
        {this.props.isSignedIn ? redirectElement : null}
        {errorMessage}
        {formElement}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.rootAuth.authLoading,
    errorMessage: state.rootAuth.error,
    isSignedIn: state.rootAuth.tokenId != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onSignUp: (email, password) =>
      dispatch(authActions.authSignUp(email, password)),
    onSignIn: (email, password) =>
      dispatch(authActions.authSignIn(email, password)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Auth);
