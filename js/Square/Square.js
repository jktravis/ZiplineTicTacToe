import React from 'react';

const defaultProps = {
  children: '\u00A0'
};

function Square({children}) {
  return (
    <div className="square col-lg-4 col-md-4 col-sm-4 col-xs-4">
      {children}
    </div>
  );
}

Square.defaultProps = defaultProps;

export default Square;
