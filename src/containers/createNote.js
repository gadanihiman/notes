/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react"
import { navigate } from 'gatsby'
// import { Link } from "gatsby"
import { Modal, Button, Input, Row, Col, Select } from 'antd'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { arrayOf, any, func } from "prop-types";
import { v4 as uuidv4 } from 'uuid';
import * as queryString from 'query-string';
import { List } from 'immutable';

import Layout from '../components/Layout/layout';
import SEO from '../components/Layout/seo';
import { storeNotes, saveNotes } from '../redux/Home/action';
import { homeData } from '../redux/Home/selectors';

const { Option } = Select;

const CreateNote = ({ onStoreNote, onSaveNote, notes, location }) => {
  const noteFormatted = notes instanceof List ? notes.toJS() : notes;
  const { id: noteID } = queryString.parse(location.search);
  const notesToDisplay = noteFormatted && noteFormatted.find(note => note.id === noteID);
  const [isVisible, setVisible] = useState(false);
  const [position, setPosition] = useState('');
  const [color, setColor] = useState('');
  const [text, setText] = useState('');
  const [tempNotes, setTempNotes] = useState(notesToDisplay || []);
  const handleColorChange = value => {
    setColor(value);
  };

  const createTempNote = config => {
    const tempNoteToStore = tempNotes;
    const noteConfig = {
      id: uuidv4(),
      ...config,
      dateCreated: new Date(),
      dateModified: new Date(),
    }
    if (tempNoteToStore.notes) {
      tempNoteToStore.notes.push(noteConfig);
    } else {
      tempNoteToStore.push(noteConfig);
    }
    setTempNotes(tempNoteToStore);
    setVisible(false);
  };
  
  const submitNote = () => {
    if (!noteID) {
      return onStoreNote(tempNotes);
    };
    navigate('/');
    return onSaveNote(tempNotes)
  };
  

  const noteFiltered = () => {
    let notesToSort;
    if (tempNotes.notes) {
      notesToSort = tempNotes.notes
    } else {
      notesToSort = tempNotes
    }
    return notesToSort.sort((a, b) => {
      const positionA = +a.position;
      const positionB = +b.position;
    
      if (positionA < positionB) {
        return -1;
      }
      if (positionA > positionB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
  }
  // tempNotes && tempNotes.notes && tempNotes.notes.sort((a, b) => {
  //   const positionA = +a.position;
  //   const positionB = +b.position;
  
  //   if (positionA < positionB) {
  //     return -1;
  //   }
  //   if (positionA > positionB) {
  //     return 1;
  //   }
  
  //   // names must be equal
  //   return 0;
  // });

  const colorResolved = bgColor => {
    let fixColor;
    switch (bgColor && bgColor.toLowerCase()) {
      case 'white':
        fixColor = 'black';
        break;
      case 'green':
        fixColor = 'white';
        break;
      case 'red':
        fixColor = 'white';
        break;
    
      default:
        fixColor = 'black'
        break;
    }
    return fixColor;
  };

  return (
    <Layout>
      <SEO title="Create notes" />
      <h1>Notes</h1>
      {noteFiltered() && noteFiltered().map(note => (
        <div
          style={{
            fontWeight: 'bold',
            fontSize: '14px',
            backgroundColor: note.color,
            padding: 20,
            width: '90%',
            margin: '10px auto',
            border: '1px solid black',
            borderRadius: 10,
            color: colorResolved(note.color),
          }}  
        >
          {note.text}
        </div>
      ))}
      <div>
        <div
          style={{
            margin: 'auto',
            textAlign: 'center',
            fontSize: 60,
            width: 100,
            height: 100,
            cursor: 'pointer',
          }}
          onClick={() => setVisible(true)}
        >
          +
        </div>
        <Modal
          title="New Note"
          visible={isVisible}
          onOk={() => createTempNote({ position, color, text })}
          onCancel={() => setVisible(false)}
        >
          <Row>
            <Col md={12}>
              <div
                style={{ marginBottom: 5 }}
              >
                <Input
                  onChange={e => setPosition(e.target.value)}
                  placeholder="position"
                  type="number"
                  value={position}
                />
              </div>
              <div
                style={{ marginBottom: 5 }}
              >
                <Select defaultValue="white" style={{ width: 120 }} onChange={handleColorChange}>
                  <Option value="white">White</Option>
                  <Option value="red">Red</Option>
                  <Option value="green">Green</Option>
                </Select>
                {/* <Input
                  onChange={e => setColor(e.target.value)}
                  placeholder="color"
                  type="text"
                  value={color}
                /> */}
              </div>
              <div
                style={{ marginBottom: 5 }}
              >
                <Input
                  onChange={e => setText(e.target.value)}
                  placeholder="Note Text"
                  type="text"
                  value={text}
                />
              </div>
            </Col>
          </Row>
        </Modal>
      </div>
      <div style={{ width: '90%', margin: '30px auto' }}>
        <Button
          type="primary"
          size="large"
          block
          onClick={() => submitNote()}
        >
          {!noteID ? 'Create' : 'Save'}
        </Button>
      </div>
    </Layout>
  );
};

const mapStateToProps = createStructuredSelector({
  notes: homeData('noteConfig'),
});

const mapDispatchToProps = {
  onStoreNote: storeNotes,
  onSaveNote: saveNotes,
};

CreateNote.propTypes = {
  notes: arrayOf(any),
  onStoreNote: func.isRequired,
  onSaveNote: func.isRequired,
};

CreateNote.defaultProps = {
  notes: [],
};

export default connect(
  mapStateToProps, mapDispatchToProps,
)(CreateNote);
