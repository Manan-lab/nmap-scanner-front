import React, { Component } from 'react';
import styles from './layout.module.css'
import { Route, Switch } from 'react-router-dom';
import Scanner from '../scanner/Scanner';
import IpAddresses from '../ip-addresses/IpAddresses';

class Layout extends Component {

  render() {
    return (
      <div className={styles.homePage}>
          <Switch>
            <Route path='/' exact component={Scanner} />
            <Route path='/scans/:id' exact component={IpAddresses} />
          </Switch>
      </div>
    )
  }
}

export default Layout;
