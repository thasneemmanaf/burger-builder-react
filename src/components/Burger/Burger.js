import React from "react";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";
import classes from "./Burger.module.css";

const burger = (props) => {
  let ingredientList = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, index) => {
        // create an empty array with as many quantity user has added
        return <BurgerIngredient type={igKey} key={igKey + index} />;
      });
    }) // to flatten the array
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  // If ingredients are not added, throw below message
  if (ingredientList.length === 0) {
    ingredientList = <p>Please add ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {ingredientList}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
