/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { node, bool, func } from "prop-types";
import { connect } from 'react-redux';

import { removeNote } from "../../../redux/Home/action";

const Card = ({ children, removeable, onRemoveNote, noteID }) => {
  const removeAction = id => {
    console.log('remove func')
    onRemoveNote(id);
  };

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
          onClick={() => removeAction(noteID)}
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
  onRemoveNote: func.isRequired,
};

Card.defaultProps = {
  children: null,
  removeable: true,
};

// const mapStateToProps = createStructuredSelector({
//   notes: homeData('noteConfig'),
// });

const mapDispatchToProps = {
  onRemoveNote: removeNote,
};

// CreateNote.propTypes = {
//   notes: arrayOf(any),
//   onStoreNote: func.isRequired,
//   onSaveNote: func.isRequired,
// };

// CreateNote.defaultProps = {
//   notes: [],
// };

export default connect(
  null, mapDispatchToProps,
)(Card);