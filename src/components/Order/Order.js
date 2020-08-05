import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
  let ingredients = [];
  for (let key in props.ingredients) {
    ingredients.push({
      name: key,
      quantity: props.ingredients[key],
    });
  }
  let ingredientOutput = ingredients.map((ingredient) => {
    return (
      <span
        key={ingredient.name}
        style={{
          textTransform: "capitalize",
          display: "inline-block",
          margin: "0 8px",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        {ingredient.name} ({ingredient.quantity})
      </span>
    );
  });

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>Total Price: {props.totalPrice}</p>
    </div>
  );
};

export default order;
