import React from 'react';

const defaultProps = {
  children: '\u00A0'
};

function Square({children, onClick, id}) {
  return (
    <div className="square col-lg-4 col-md-4 col-sm-4 col-xs-4" onClick={onClick} data-id={id}>
      {children || '\u00A0'}
    </div>
  );
}

Square.defaultProps = defaultProps;

export default Square;
