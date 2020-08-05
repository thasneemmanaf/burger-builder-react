import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as orderActionCreators from "../../../store/actions/index";
class ContactData extends Component {
  state = {
    formData: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        hasTouched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Street",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        hasTouched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your ZIP CODE",
        },
        value: "",
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5,
        },
        valid: false,
        hasTouched: false,
      },
      emailID: {
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
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        hasTouched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {
          required: false,
        },
        valid: true,
      },
    },
    isFormValid: false,

    totalPrice: 0,
  };

  //   to save burger details and address to the DB when pressing 'ORDER NOW'
  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    // to read values in form
    const formData = {};
    for (let key in this.state.formData) {
      formData[key] = this.state.formData[key].value;
    }

    const order = {
      ingredients: this.props.ingrs,
      price: this.props.price,
      customer: formData,
      userId: this.props.userId,
    };

    this.props.onPostBurgerOrder(order, this.props.token);
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
    const updatedFormData1 = { ...this.state.formData };

    const updatedFormData2 = { ...updatedFormData1[elementID] };
    updatedFormData2.hasTouched = true;
    updatedFormData2.value = event.target.value;
    updatedFormData2.valid = this.checkValidity(
      updatedFormData2.value,
      updatedFormData2.validation
    );
    updatedFormData1[elementID] = updatedFormData2;

    // to check if form is valid
    let isFormValid = true;
    for (let key in updatedFormData1) {
      isFormValid = updatedFormData1[key].valid && isFormValid;
    }

    this.setState({ formData: updatedFormData1, isFormValid: isFormValid });
  };
  render() {
    const formDataArray = [];
    for (let key in this.state.formData) {
      formDataArray.push({ id: key, config: this.state.formData[key] });
    }

    let formElement = (
      <form onSubmit={this.orderHandler}>
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

        <Button btnType="Success" disabled={!this.state.isFormValid}>
          ORDER NOW
        </Button>
      </form>
    );
    if (this.props.lodng) {
      formElement = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact details</h4>
        {formElement}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.rootIngredient.ingredients,
    price: state.rootIngredient.totalPrice,
    lodng: state.rootOrder.loading,
    token: state.rootAuth.tokenId,
    userId: state.rootAuth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPostBurgerOrder: (order, token) =>
      dispatch(orderActionCreators.postBurgerOrder(order, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
