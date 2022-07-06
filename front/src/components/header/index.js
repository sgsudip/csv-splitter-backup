import React from "react";
import './main.css'
import Layout from "../../pages/layout";
import Envoy from "../../pages/envoy/envoy";

const Main = () => {
  return <div className="d-flex">
    <Layout />
    <Envoy />
  </div>;
};

export default Main;
