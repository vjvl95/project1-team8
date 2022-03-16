import React, { useState } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';

function AwardEditForm({ user, setIsEditing, setUser }) {
  //useState로 award 상태를 생성함.
  const [award, setAward] = useState(user.award);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      award,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
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
