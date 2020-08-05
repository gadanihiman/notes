/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
import React, { useState } from 'react'
import { Link } from 'gatsby'
import { arrayOf, any, func } from 'prop-types'
import { isEmpty } from 'lodash'
import { createStructuredSelector } from 'reselect'
import { connect } from 'react-redux'

import Card from '../components/general/Card'
import Layout from '../components/Layout/layout'
import SEO from '../components/Layout/seo'
import { homeData } from '../redux/Home/selectors'
import { removeNote } from '../redux/Home/action'

const IndexPage = ({ noteList, onRemoveNote }) => {
  const [removeable, setRemovable] = useState(false);
  const removeAction = id => {
    console.log('remove func')
    onRemoveNote(id);
  };

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Notes</h1>

      <div style={{ display: 'flex' }}>
        {isEmpty(noteList) && <h2>Notes is empty ...</h2>}
        {noteList && noteList.map(({ id }) => (
          <div key={id} style={{ margin: 10 }}>
            {removeable &&
              <div
                style={{
                  fontSize: '20px',
                  background: 'white',
                  cursor: 'pointer',
                  position: 'absolute',
                  top: '182px',
                  left: '168px',
                  textAlign: 'center',
                  border: '1px solid black',
                  borderRadius: '50px',
                  width: '25px',
                }}
                onClick={() => removeAction(id)}
              >
                X
              </div>}
            <Link to={`/notes/?id=${id}`}>
              <Card noteID={id} />
            </Link>
          </div>
        ))}
        <Link to="/createNote">
          <div
            style={{
              margin: '0px 0px 0px 30px',
              textAlign: 'center',
              fontSize: 60,
              width: 100,
              height: 100,
              cursor: 'pointer',
            }}
          >
            +
          </div>
        </Link>
      </div>

      <div
        style={{
          marginTop: 100,
          textAlign: 'right',
          cursor: 'pointer',
          fontSize: '16px'
        }}
        onClick={() => setRemovable(!removeable)}
      >
        <span>{removeable ? 'Cancel' : 'Edit'}</span>
      </div>
    </Layout>
  )
}

IndexPage.propTypes = {
  noteList: arrayOf(any),
  onRemoveNote: func.isRequired,
};

IndexPage.defaultProps = {
  noteList: [],
};

const mapStateToProps = createStructuredSelector({
  noteList: homeData('noteConfig'),
});

const mapDispatchToProps = {
  onRemoveNote: removeNote,
};


export default connect(
  mapStateToProps, mapDispatchToProps,
)(IndexPage);