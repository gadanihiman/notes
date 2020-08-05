/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { node } from 'prop-types';

const Card = ({ children }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: 100,
        height: 100,
        cursor: 'pointer',
      }}
    >
      {children}
    </div>
  )
};

Card.propTypes = {
  children: node,
};

Card.defaultProps = {
  children: null,
};

export default Card;
