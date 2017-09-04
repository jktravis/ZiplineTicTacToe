import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Square from './Square';

class App extends Component {
  constructor() {
    super();

    this.state = {
      board: [
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        ''
      ]
    };
  }

  render() {
    const {board} = this.state;
    return (
      <Grid fluid>
        <Row>
          <Col md={4} lg={4} lgOffset={4} mdOffset={4} sm={10} smOffset={1} xs={12}>
            <h1>Tic-Tac-Toe</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={4} smOffset={4}
               xs={10} xsOffset={1}>
            <Row>
              <Square> 0 </Square>
              <Square> 1 </Square>
              <Square> 2 </Square>
            </Row>
            <Row>
              <Square> 3 </Square>
              <Square> 4 </Square>
              <Square> 5 </Square>
            </Row>
            <Row>
              <Square> 6 </Square>
              <Square> 7 </Square>
              <Square> 8 </Square>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
