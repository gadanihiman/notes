import React from "react"
import { Link } from "gatsby"
import { arrayOf, any } from "prop-types"
import { isEmpty } from 'lodash'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import Card from '../components/general/Card'
import Layout from "../components/Layout/layout"
import SEO from "../components/Layout/seo"
import { homeData } from "../redux/Home/selectors";

const IndexPage = ({ noteList }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Notes</h1>

      <div style={{ display: 'flex' }}>
        {isEmpty(noteList) && <h2>Notes is empty ...</h2>}
        {noteList && noteList.map(({ id }) => (
          <div style={{ margin: 10 }}>
            <Link to={`/notes/?id=${id}`}>
              <Card />
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
  noteList: [],
};

const mapStateToProps = createStructuredSelector({
  noteList: homeData('noteConfig'),
});

// const mapDispatchToProps = {
//   onStoreNote: storeNotes,
// };

export default connect(
  mapStateToProps,
)(IndexPage);