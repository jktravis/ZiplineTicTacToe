import React from 'react';
import ClassNames from 'classnames';

const defaultProps = {
  children: '\u00A0'
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

Square.defaultProps = defaultProps;

export default Square;
