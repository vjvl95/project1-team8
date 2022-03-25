import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row,Card } from 'react-bootstrap';
import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';
import { BookmarkListContext } from "../../App";

function Network() {
  const {setBookmarklist}=useContext(BookmarkListContext)
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [top3,setTop3]=useState([])

  useEffect(  () => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    async function getUser(){
      const top3=await Api.get('user/bookmarktop3')
      const res= await Api.get('userlist/notop3')
      const new_bookmarklist=await Api.get('user/bookmarklist')
      setBookmarklist(new_bookmarklist.data)
      setTop3(top3.data)
      console.log(res)
      setUsers(res.data)
      
  }
  getUser()
  }, [userState, navigate]);

  return (
    <Container fluid>
      <div style={{backgroundColor:"gray" ,borderRadius: "30px"}}>
      <div style={{marginLeft:"20%",marginRight:"20%",marginBottom:"70px" }}>
        <h1 style={{marginBottom:"30px", marginTop:"40px"}}>인기 많은 포토폴리오</h1>
            <Row className="justify-content-between">
            {top3.map((top,index)=>
            (
            <UserCard key={top.id} user={top} isNetwork num={index+1} />
            ))}
            </Row>
      </div>
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
