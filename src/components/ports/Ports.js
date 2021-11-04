import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import styles from './ports.module.css';

const API_URL = process.env.REACT_APP_API_HOST;

class Ports extends Component{
  
  state = {
      portsData: [],
      totalCount: null,
      currentPage: null
  }
  
  componentDidMount() {
    this.onSendRequest();
  }
  
  onSendRequest(){
    axios.get(`${API_URL}/open-ports`)
    .then(response =>{
      console.log(response); //fixme
      this.setState({
        portsData:response.data.data,
        // pageCount:response.data.pageCount,
        // currentPage:response.data.page
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }
  
  
  render() {
    let num = 1;
    return  (
            <>
              <Table bordered hover>
                <thead className={styles.tableHead}>
                <tr>
                  <th>#</th>
                  <th>Port</th>
                  <th>Protocol</th>
                  <th>Service</th>
                  <th>Method</th>
                </tr>
                </thead>
                <tbody>
                {
                  this.state.portsData.map((item, i) => {
                    return [
                      <tr key={i}>
                        <td>{num++}</td>
                        <td>{item.port}</td>
                        <td>{item.protocol}</td>
                        <td>{item.service}</td>
                        <td>{item.method}</td>
                      </tr>
                    ]
                  })
                }
                </tbody>
              </Table>
  
              <button onClick={this.onSendRequest}>request</button>
            </>
    )
  }
}

export default Ports;
