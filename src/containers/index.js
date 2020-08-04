import React from "react"
import { Link } from "gatsby"
import { arrayOf, any } from "prop-types"

import Card from '../components/general/Card'
import Layout from "../components/Layout/layout"
import SEO from "../components/Layout/seo"

const IndexPage = ({ noteList }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Notes</h1>

      <div style={{ display: 'flex' }}>
        {noteList.map(({ notesID }) => (
          <Link to={`/notes/${notesID}`}>
            <Card />
          </Link>
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

      <Link to={`/notes/1`}>
        <div style={{
            marginTop: 100,
            textAlign: 'right',
            cursor: 'pointer',
          }}
        >
          <span>Edit</span>
        </div>
      </Link>
    </Layout>
  )
}

IndexPage.propTypes = {
  noteList: arrayOf(any),
};

IndexPage.defaultProps = {
  noteList: [{
    notesID: 1,
    position: 1,
    color: '',
    datecreated: '',
    dateModified: '',
  }],
};

export default IndexPage;
