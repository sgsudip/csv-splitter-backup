import React from "react";
import { Switch, Route } from "react-router-dom";
import Braintree from "../pages/braintree/braintree";
import Envoy from "../pages/envoy/envoy";
import Payoneer from "../pages/payoneer/payoneer";
import WU from "../pages/wu/wu";
import LayoutCover from "../pages/layoutCover";
import PayoneerTable from "../pages/payoneer/PayonnerTable";
import EnvoyTable from "../pages/envoy/envoytable";
import FileSplitter from "../pages/fileSplitter/fileSplitter";
import CsvFileSplitter from "../pages/CSV-File-Splitter/csvFileSpillter";

const RouteHandle = () => {
  return (
    <Switch>
      <LayoutCover>
        <Route exact strict path="/" component={Envoy} />
        <Route exact strict path="/payoneer" component={Payoneer} />
        <Route exact strict path="/envoy" component={Envoy} />
        <Route exact strict path="/wu" component={WU} />
        <Route exact strict path="/braintree" component={Braintree} />
        <Route exact strict path="/envoy-table" component={EnvoyTable} />
        <Route exact strict path="/file" component={FileSplitter} />
        <Route exact strict path="/csv-splitter" component={CsvFileSplitter} />

        <Route exact strict path="/payoneer-table" component={PayoneerTable} />
      </LayoutCover>
    </Switch>
  );
};

export default RouteHandle;
