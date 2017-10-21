import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Square from '../Square';
import PropTypes from 'prop-types';

const propTypes = {
  squareClickFn: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired,
  players: PropTypes.shape({
    player1: PropTypes.object.isRequired,
    player2: PropTypes.object.isRequired
  }).isRequired
};

class Board extends Component {
  render() {
    const { players: { player1, player2 } } = this.props;
    return (
      <div className="board">
        {this.props.data.map((group, rIdx) => {
          return (
            <Row key={rIdx}>
              {group.map((cell) => {
                console.log(cell);
                return (
                  <Square key={cell.id} onClick={cell.value ? null : this.props.squareClickFn} id={cell.id}>
                    {
                      cell.value === player1.token ? player1.display :
                        cell.value === player2.token ? player2.display :
                          cell.value
                    }
                  </Square>
                );
              })}
            </Row>
          );
        })}
      </div>
    );
  }
}

Board.propTypes = propTypes;

export default Board;
