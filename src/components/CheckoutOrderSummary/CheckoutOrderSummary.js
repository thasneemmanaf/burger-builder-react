import React from "react";
import Burger from "../Burger/Burger";
import Button from "../UI/Button/Button";
import classes from "./CheckoutOrderSummary.module.css";

const checkoutOrderSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Here is your delicious burger</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button btnType="Danger" btnOperation={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" btnOperation={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default checkoutOrderSummary;
