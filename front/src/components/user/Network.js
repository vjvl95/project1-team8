import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row,Card } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);

  useEffect(  () => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
    // "userlist" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
    async function getUser(){
      const res= await Api.get('userlist')
      console.log(res)

      setUsers(res.data)
      console.log(users)
  }
  getUser()
  }, [userState, navigate]);

  return (
    <Container fluid>
      <div style={{marginLeft:"20%",marginRight:"20%",marginBottom:"70px"}}>
        <h1 style={{marginBottom:"30px"}}>인기 많은 포토폴리오</h1>
            <Row className="justify-content-between">
            {<UserCard key={1} user={users[1]} isNetwork num={1}/>}
            {<UserCard key={2} user={users[1]} isNetwork num={2}/>}
            {<UserCard key={3} user={users[1]} isNetwork num={3}/>}
            </Row>
      </div>
      <Row className='jusify-content-center' style={{marginLeft:"5%"}}>
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
