import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  let validationError = null;

  if (props.inValid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
    validationError = <p>please enter valid value</p>;
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <div>
          <input
            onChange={props.clicked}
            className={inputClasses.join(" ")}
            {...props.elementConfig}
            value={props.value}
          />
          {validationError}
        </div>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.clicked}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.clicked}
          className={inputClasses.join(" ")}
          value={props.value}
        >
          {props.elementConfig.options.map((option) => {
            return (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            );
          })}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.clicked}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
