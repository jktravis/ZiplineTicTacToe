import React, { Component } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';
import Square from './Square';
import TypeText from './TypeText';
import TicTacToe from './TicTacToe';

class App extends Component {
  constructor() {
    super();

    this.state = TicTacToe.reset();
    this.state.showChooser = false;

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.openChooser = this.openChooser.bind(this);
    this.closeChooser = this.closeChooser.bind(this);
  }

  openChooser() {
    this.setState(state => ({ showChooser: true }));
  }

  closeChooser() {
    this.setState(state => ({ showChooser: false }));
  }

  handleSquareClick(event) {
    let { target: { dataset: { id } } } = event;
    this.setState(state => {
      const board = state.board.slice();
      board[id].value = state.isPlayerTurn ? state.player : state.ai;
      return {
        board,
        isPlayerTurn: !state.isPlayerTurn
      };
    });
  }

  handleResetClick() {
    this.setState(() => {
      return TicTacToe.reset();
    });
  }

  componentDidUpdate() {
    const { gameOver, status: winner } = TicTacToe.getGameStatus(this.state.board, false);
    if (gameOver) {
      console.log('game over...', winner, 'wins');
    } else if (!this.state.isPlayerTurn) {
      this.getNextAIMove();
    }
  }

  getNextAIMove() {
    this.setState(state => {
      const status = TicTacToe.getNextMove(state.board, state.ai);
      return {
        board: status.boardWithMove,
        isPlayerTurn: !state.isPlayerTurn
      };
    });
  }

  render() {
    const { board } = this.state;
    const chunkSize = 3;
    const groups = board.map((datum, idx) => {
      return idx % chunkSize === 0 ? board.slice(idx, idx + chunkSize) : null;
    }).filter(datum => datum);

    return (
      <div>
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
                    {group.map((cell) => {
                      return (
                        <Square key={cell.id} onClick={cell.value ? null : this.handleSquareClick} id={cell.id}>
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
                <Button bsStyle="success" onClick={this.openChooser}>Start</Button>
                <Button bsStyle="warning" onClick={this.handleResetClick}>Reset</Button>
              </div>
            </Col>
          </Row>
        </Grid>
        <Modal show={this.state.showChooser} onHide={this.closeChooser}>
          <Modal.Header closeButton>
            <Modal.Title>Choose</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.closeChooser}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
