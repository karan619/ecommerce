import React from "react";
import "../style/Loader.css";
import { CircularProgress } from "@material-ui/core";

function Loader() {
  return (
    <div className="loader">
      <CircularProgress animation="border" variant="secondary" />
    </div>
  );
}

export default Loader;
