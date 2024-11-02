import React from "react";
import "../spinner.css";

const SpinnerLoader = () => {
  return (
    <div>
      <div className="spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default SpinnerLoader;
