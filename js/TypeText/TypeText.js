import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Typed from 'typed.js';

const propTypes = {
  strings: PropTypes.array.isRequired
};

class TypeText extends Component {
  componentDidMount() {
    // If you want to pass more options as props, simply add
    // your desired props to this destructuring assignment.
    const {strings} = this.props;
    // You can pass other options here, such as typing speed, back speed, etc.
    const options = {
      strings,
      typeSpeed: 40,
      backSpeed: 20,
      backDelay: 30000,
      loop: false
    };
    // this.el refers to the <span> in the render() method
    this.typed = new Typed(this.el, options);
  }

  componentWillUnmount() {
    // Make sure to destroy Typed instance on unmounting
    // to prevent memory leaks
    this.typed.destroy();
  }

  render() {
    return (
      <div className="message" ref={el => this.el = el}/>
    );
  }
}

TypeText.propTypes = propTypes;

export default TypeText;