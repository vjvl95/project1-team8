import React, { useState, useContext } from 'react';
import { Button, Form, Card, Col, Row } from 'react-bootstrap';
import * as Api from '../../api';
import { DispatchContext } from '../../App';
import { useNavigate } from 'react-router-dom';

function UserEditForm({ user, setIsEditing, setUser }) {
  const navigate = useNavigate();
  const { userDispatch } = useContext(DispatchContext);

  //useState로 name 상태를 생성함.
  const [name, setName] = useState(user.name);
  //useState로 email 상태를 생성함.
  const [email, setEmail] = useState(user.email);
  //useState로 description 상태를 생성함.
  const [description, setDescription] = useState(user.description);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "users/유저id" 엔드포인트로 PUT 요청함.
    const res = await Api.put(`users/${user.id}`, {
      name,
      email,
      description,
    });
    // 유저 정보는 response의 data임.
    const updatedUser = res.data;
    // 해당 유저 정보로 user을 세팅함.
    setUser(updatedUser);

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  const handleDelete = async () => {
    await Api.delete(`users/${user.id}`);
  };

  return (
    <Card className='mb-2'>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='useEditName' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='이름'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditEmail' className='mb-3'>
            <Form.Control
              type='email'
              placeholder='이메일'
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='userEditDescription'>
            <Form.Control
              type='text'
              placeholder='정보, 인사말'
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
              <Col className='mt-3 text-center'>
                <Button
                  variant='danger'
                  onClick={() => {
                    if (window.confirm('정말 탈퇴하시겠습니까?😢')) {
                      handleDelete();
                      sessionStorage.removeItem('userToken');
                      userDispatch({ type: 'LOGOUT' });
                      navigate('/');
                    }
                  }}
                >
                  회원탈퇴
                </Button>
              </Col>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default UserEditForm;
