import React, { Component } from 'react';
import { Grid, Row, Col, Button, Modal } from 'react-bootstrap';

import Board from './Board';
import TypeText from './TypeText';
import TicTacToe from './TicTacToe';
import Chooser from './Chooser';

class App extends Component {
  constructor() {
    super();

    const reset = TicTacToe.reset();
    const { gameOver, status: winner } = TicTacToe.getGameStatus(reset.board, false);

    this.state = {
      ...reset,
      showChooser: false,
      gameOver,
      winner,
      gameStarted: false,
      message: "Shall we play a game?"
    };

    this.handleSquareClick = this.handleSquareClick.bind(this);
    this.handleResetClick = this.handleResetClick.bind(this);
    this.openChooser = this.openChooser.bind(this);
    this.closeChooser = this.closeChooser.bind(this);
    this.getGameState = this.getGameState.bind(this);
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
      board[id].value = state.isPlayerTurn ? state.players.player1.token : state.players.player2.token;
      return {
        board,
        isPlayerTurn: !state.isPlayerTurn,
        gameStarted: true
      };
    }, this.getGameState);
  }

  getGameState() {
    const { gameOver, status: winner } = TicTacToe.getGameStatus(this.state.board, false);
    if (gameOver) {
      this.setState(() => ({gameOver, winner, message: `Game over... ${winner} wins`}));
    } else if (!this.state.isPlayerTurn) {
      this.getNextAIMove();
    }
  }

  handleResetClick() {
    this.setState(() => {
      return {
        ...TicTacToe.reset(),
        gameOver: false
      }
    });
  }

  getNextAIMove() {
    this.setState(state => {
      const status = TicTacToe.getNextMove(state.board, state.players.player2.token);
      return {
        board: status.boardWithMove,
        isPlayerTurn: !state.isPlayerTurn
      };
    }, this.getGameState);
  }

  render() {
    const { board } = this.state;
    const chunkSize = 3;
    const data = board.map((datum, idx) => {
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
              <Board squareClickFn={this.handleSquareClick}
                     data={data}
                     players={this.state.players}/>
            </Col>
          </Row>
          <Row>
            <Col lg={4} lgOffset={4} md={4} mdOffset={4} sm={4} smOffset={4}
                 xs={10} xsOffset={1}>
              {
                (!this.state.gameStarted || (this.state.gameStarted && this.state.gameOver)) &&
                <TypeText strings={[this.state.message]}/>
              }
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
            <Modal.Title>Choose Tokens</Modal.Title>
          </Modal.Header>
          <Chooser/>
          <Modal.Footer>
            <Button onClick={this.closeChooser}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
