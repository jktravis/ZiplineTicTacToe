import React from 'react';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';

const propTypes = {
  children: PropTypes.any,
  onClick: PropTypes.func,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired
};

function Square({children, onClick, id}) {
  const htmlClasses = ClassNames({
    'square': true,
    'col-lg-4': true,
    'col-md-4': true,
    'col-sm-4': true,
    'col-xs-4': true,
    'square--clickable': typeof onClick === 'function'
  });
  return (
    <div className={htmlClasses} onClick={onClick} data-id={id}>
      {children || '\u00A0'}
    </div>
  );
}

Square.propTypes = propTypes;

export default Square;
