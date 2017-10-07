import React, { Component } from 'react';
import ModalBody from 'react-bootstrap/lib/ModalBody';
import Button from 'react-bootstrap/lib/Button';
import PropTypes from 'prop-types';

class Chooser extends Component {
  render() {
    return (
      <ModalBody>
        <p>Play as X or as O?</p>
        <Button onClick={this.chooseToken}>X</Button>
        <Button onClick={this.chooseToken}>O</Button>
      </ModalBody>
    );
  }
}

export default Chooser;
