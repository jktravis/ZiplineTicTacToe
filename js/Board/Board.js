import React, { Component } from 'react';
import { Row } from 'react-bootstrap';
import Square from '../Square';
import PropTypes from 'prop-types';

const propTypes = {
  squareClickFn: PropTypes.func.isRequired,
  data: PropTypes.array.isRequired
};

class Board extends Component {
  render() {
    console.group('board');
    console.log('props', this.props);
    console.groupEnd();
    return (
      <div className="board">
        {this.props.data.map((group, rIdx) => {
          return (
            <Row key={rIdx}>
              {group.map((cell) => {
                return (
                  <Square key={cell.id} onClick={cell.value ? null : this.props.squareClickFn} id={cell.id}>
                    {cell.value}
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
