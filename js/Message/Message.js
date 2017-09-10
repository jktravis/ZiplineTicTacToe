import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  text: PropTypes.string
};

const defaultProps = {
  text: ''
};

class Message extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="message">{text}</div>
    );
  }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
