import React, { Component } from 'react';
import Button from 'react-bootstrap/lib/Button';

class ChooseXToken extends Component {
  render() {
    return (
      <div>
        <p>Choose Ys token</p>
        <Button bsStyle="primary" onClick={this.props.back}>Back</Button>
        <Button bsStyle="primary" onClick={this.props.next}>Next</Button>
      </div>
    );
  }
}

export default ChooseXToken;
