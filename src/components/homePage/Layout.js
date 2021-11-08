import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styles from './layout.module.css'
import Scanner from '../scanner/Scanner';
import IpAddresses from '../ip-addresses/IpAddresses';
import OpenPorts from "../open-ports/OpenPorts";
import NotFound from "../notFoundPage/NotFound";

class Layout extends Component {
  render() {
    return (
      <div className={styles.homePage}>
        <Switch>
          <Route path='/' exact component={ Scanner } />
          <Route path='/scans/:uuid' exact component={ IpAddresses } />
          <Route path='/scans/:uuid/ips/:ipsUuid' exact component={ OpenPorts } />
          <Route path='/not-found' exact component={ NotFound } />
          <Redirect to="/not-found" />
        </Switch>
      </div>
    )
  }
}

export default Layout;
