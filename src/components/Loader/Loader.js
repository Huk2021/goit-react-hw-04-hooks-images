import React from "react";
import { Bars } from "react-loader-spinner";
import { Loading } from "./Loader.styled";

const Loader = () => {
  return (
    <Loading>
      Loading
      <Bars
        heigth="100"
        width="200"
        color="#3f51b5"
        arialLabel="loading-indicator"
      />
    </Loading>
  );
};

export default Loader;
