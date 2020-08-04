/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from "react"
import { Link } from "gatsby"
import { Modal, Button, Input, Row, Col } from 'antd'

import Layout from "../components/Layout/layout"
import SEO from "../components/Layout/seo"

const CreateNote = () => {
  const [isVisible, setVisible] = useState(true);
  const [position, setPosition] = useState('');
  const [color, setColor] = useState('');

  return (
    <Layout>
      <SEO title="Create notes" />
      <h1>New Notes</h1>
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
          onOk={() => setVisible(false)}
          onCancel={() => setVisible(false)}
        >
          <Row>
            <Col md={12}>
              <Input
                onChange={e => setPosition(e.target.value)}
                placeholder="position"
                type="number"
                value={position}
              />
              <Input
                onChange={e => setColor(e.target.value)}
                placeholder="color"
                type="text"
                value={color}
              />
            </Col>
          </Row>
        </Modal>
      </div>
      
    </Layout>
  );
};

export default CreateNote
