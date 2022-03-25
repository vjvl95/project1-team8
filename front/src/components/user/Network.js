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
  const randomColor=['#edf2fb' , '#e2eafc','#d7e3fc','#ccdbfd','#c1d3fe','#b6ccfe','#abc4ff']

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
      <div style={{backgroundColor:"#FFDDEE" ,borderRadius: "60px" , opacity: 0.95, paddingBottom:"10px", marginTop:"30px",marginBottom:"30px", paddingTop:"10px"}}>
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
      <Row xs="auto"  className="justify-content-center">
        {users.map((user,index) => (
          <UserCard key={user.id} user={user} isNetwork color={randomColor[index%7]} />
        ))}
      </Row>


    </Container>
  );
}

export default Network;
