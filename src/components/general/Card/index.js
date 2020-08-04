import React, { useEffect } from "react";
import { node, bool } from "prop-types";

const Card = ({ children, removeable }) => {
  return (
    <div
      style={{
        border: '1px solid black',
        width: 100,
        height: 100,
        cursor: 'pointer',
      }}
    >
      {removeable &&
        <div
          style={{
            fontSize: '20px',
            background: 'white',
            cursor: 'pointer',
            position: 'relative',
            bottom: '15px',
            left: '85px',
            textAlign: 'center',
            border: '1px solid black',
            borderRadius: '50px',
            width: '25px',
          }}
        >
          X
        </div>}
      {children}
    </div>
  )
};

Card.propTypes = {
  children: node,
  removeable: bool,
};

Card.defaultProps = {
  children: null,
  removeable: true,
};

export default Card;
