import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import { checkPropTypes } from "prop-types";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Total price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            key={control.label}
            label={control.label}
            moreIngredient={() => props.moreIngredient(control.type)}
            lessIngredient={() => props.lessIngredient(control.type)}
            disableInfo={props.disableInfo[control.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={props.disabled}
        onClick={props.clicked}
      >
        {props.isSignedIn ? "ORDER NOW" : "PLEASE LOGIN TO CONTINUE ORDER"}
      </button>
    </div>
  );
};

export default buildControls;
