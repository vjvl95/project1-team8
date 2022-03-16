import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ user, setIsEditing, setUser, isForListItem }) {
  const [award, setAward] = useState(user.award);
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await Api.put(`awards/${user.id}`, {
      award,
      description,
    });

    const updatedUser = res.data;

    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='useEditName' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='수상내역'
              value={award}
              onChange={(e) => setAward(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditEmail' className='mb-3'>
            <Form.Control
              type='description'
              placeholder='상세내역'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Row} className='mt-3 text-center'>
            <Col sm={{ span: 20 }}>
              <Button variant='primary' type='submit' className='me-3'>
                확인
              </Button>
              <Button variant='secondary' onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
  );
}

export default AwardEditForm;
