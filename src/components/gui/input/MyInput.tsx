import React from "react";
import classes from "./MyInput.module.css";

const MyInput = (
  props: JSX.IntrinsicAttributes & React.ClassAttributes<HTMLInputElement> & React.InputHTMLAttributes<HTMLInputElement>
) => {
  return (
    <>
      <input {...props} className={classes.myInput} />
    </>
  );
};

export default MyInput;
