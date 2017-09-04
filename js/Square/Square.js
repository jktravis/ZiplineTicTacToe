import React from 'react';
import PropTypes from 'prop-types';

function Square({children}) {
  return (
    <div className="square col-lg-4 col-md-4 col-sm-4 col-xs-4">
      {children}
    </div>
  );
}

export default Square;
