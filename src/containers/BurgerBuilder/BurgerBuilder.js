import React, { Component } from "react";
import Aux from "../../hoc/Auxilliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import buildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/index";

class BurgerBuilder extends Component {
  state = {
    disableOrderBtn: true,
    purching: false,
    loading: false,
  };

  componentDidMount() {
    this.props.getInitIngredients();
  }

  // this is to initialise purchasing state
  componentWillMount() {
    this.props.onPurchaseInit();
  }

  // addIngredientsHandler = (type) => {
  //   let oldQuantity = this.state.ingredients[type];
  //   let newQuantity = oldQuantity + 1;
  //   let newIngredients = { ...this.state.ingredients };
  //   newIngredients[type] = newQuantity;
  //   let oldTotalPrice = this.state.totalPrice;
  //   let newTotalPrice = oldTotalPrice + INGREDIENT_PRICES[type];
  //   this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice });
  //   this.calculateTotalQty(newIngredients);
  // };

  //To remove items from the burger
  // removeIngredientsHandler = (type) => {
  //   let oldQuantity = this.state.ingredients[type];
  //   let newQuantity = oldQuantity - 1;
  //   let newIngredients = { ...this.state.ingredients };
  //   newIngredients[type] = newQuantity;
  //   let oldTotalPrice = this.state.totalPrice;
  //   let newTotalPrice = oldTotalPrice - INGREDIENT_PRICES[type];
  //   this.setState({ ingredients: newIngredients, totalPrice: newTotalPrice });
  //   this.calculateTotalQty(newIngredients);
  // };

  // to disable order button
  calculateTotalQty = (newIngredients) => {
    // let newIngredients = { ...this.state.ingredients };

    let sum = 0;
    for (let key in newIngredients) {
      sum = sum + newIngredients[key];
    }
    if (sum > 0) {
      // this.setState({ disableOrderBtn: false });
      return false;
    } else {
      // this.setState({ disableOrderBtn: true });
      return true;
    }
  };

  // to show order summary
  showOrderSummary = () => {
    if (!this.props.isSignedIn) {
      this.props.history.push("/auth");
    }
    this.setState({ purching: true });
  };

  // to close backdrop
  closeBackdropHandler = () => {
    this.setState({ purching: false });
  };

  // to continue purchase in continue button in order summary
  continuePurchaseHandler = () => {
    // const queryParams = [];
    // for (let i in this.props.ingrs) {
    //   queryParams.push(
    //     encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingrs[i])
    //   );
    // }
    // queryParams.push("totalPrice" + "=" + this.props.price);
    // const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      // search: "?" + queryString,
    });
  };
  render() {
    const disableInfo = { ...this.props.ingrs };

    for (let key in disableInfo) {
      if (disableInfo[key] === 0) {
        disableInfo[key] = true;
      } else {
        disableInfo[key] = false;
      }
    }

    // loader/spinner before getting ingredients
    let burger = <Spinner />;
    let orderSummary = null;
    if (this.props.ingrs) {
      burger = <Burger ingredients={this.props.ingrs} />;
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingrs}
          cancelBtn={this.closeBackdropHandler}
          continueBtn={this.continuePurchaseHandler}
          totalPrice={this.props.price}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Aux>
        <Modal
          show={this.state.purching}
          closeBackdrop={this.closeBackdropHandler}
        >
          {orderSummary}
        </Modal>
        {burger}

        <BuildControls
          moreIngredient={this.props.onAddIngredient}
          lessIngredient={this.props.onRemoveIngredient}
          disableInfo={disableInfo}
          totalPrice={this.props.price}
          disabled={this.calculateTotalQty(this.props.ingrs)}
          clicked={this.showOrderSummary}
          isSignedIn={this.props.isSignedIn}
        />
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingrs: state.rootIngredient.ingredients,
    price: state.rootIngredient.totalPrice,
    isSignedIn: state.rootAuth.tokenId != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onPurchaseInit: () => dispatch(actionCreators.puchasingInit()),
    getInitIngredients: () => dispatch(actionCreators.fetchIngredients()),
    onAddIngredient: (IgName) => dispatch(actionCreators.addIngredient(IgName)),
    onRemoveIngredient: (IgName) =>
      dispatch(actionCreators.removeIngredient(IgName)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);
