import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import Square from './Square';
import TypeText from './TypeText';

class App extends Component {
  constructor() {
    super();

    this.state = {
      player: 'X',
      ai: 'O',
      isPlayerTurn: true,
      board: [
        {id: 0, value: null},
        {id: 1, value: null},
        {id: 2, value: null},
        {id: 3, value: null},
        {id: 4, value: null},
        {id: 5, value: null},
        {id: 6, value: null},
        {id: 7, value: null},
        {id: 8, value: null}
      ]
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
  }

  handleSquareClick(event) {
    let {target: {dataset: {id}}} = event;
    // id = parseInt(id, 10);
    this.setState(state => {
      const board = state.board.slice();
      board[id].value = state.isPlayerTurn ? state.player : state.ai;
      return {
        board,
        isPlayerTurn: !state.isPlayerTurn
      };
    });
  }

  render() {
    const {board} = this.state;
    const chunkSize = 3;
    const groups = board.map((datum, idx) => {
      return idx % chunkSize === 0 ? board.slice(idx, idx + chunkSize) : null;
    }).filter(datum => datum);

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
            {groups.map((group, rIdx) => {
              return (
                <Row key={rIdx}>
                  {group.map((cell, cIdx) => {
                    return (
                      <Square key={cell.id} onClick={this.handleSquareClick} id={cell.id}>
                        {cell.value}
                      </Square>
                    );
                  })}
                </Row>
              );
            })}
          </Col>
        </Row>
        <Row>
          <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={4} smOffset={4}
               xs={10} xsOffset={1}>
            <TypeText strings={['Shall we play a game?']}/>
          </Col>
        </Row>
        <Row>
          <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={4} smOffset={4}
               xs={10} xsOffset={1}>
            <div id="buttons">
              <Button bsStyle="success">Start</Button>
            </div>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
