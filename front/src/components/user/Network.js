import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row,Card } from 'react-bootstrap';
import * as Api from '../../api';
import UserCard from './UserCard';
import { UserStateContext } from '../../App';
import { BookmarkListContext } from "../../App";

function Network() {
  const {bookmarklist,setBookmarklist}=useContext(BookmarkListContext)

  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  // useState 훅을 통해 users 상태를 생성함.
  const [users, setUsers] = useState([]);
  const [top3,setTop3]=useState([])
  const randomColor=['lightblue' , 'aquamarine','blanchedalmond','lightpink',' gainsboro','powderblue','azure','papayawhip','navajowhite','lavender','honeydew','lightcyan','pink','lavenderblush']

  useEffect(  () => {
    if (!userState.user) {
      navigate('/login');
      return;
    }
    async function getUser(){
      const top3=await Api.get('user/bookmarktop3')
      const res= await Api.get('userlist')
      const bookmarklist=await Api.get('user/bookmarklist')
      console.log(top3)
      setBookmarklist(bookmarklist.data)
      setUsers(res.data)
      setTop3(top3.data)

  }
  getUser()
  }, [userState, navigate]);

  return (
    <Container fluid>
      <div style={{marginLeft:"20%",marginRight:"20%",marginBottom:"70px" }}>
        <h1 style={{marginBottom:"30px", marginTop:"40px"}}>인기 많은 포토폴리오</h1>
            <Row className="justify-content-between">
            {top3.map((top,index)=>
            (
            <UserCard key={top.id} user={top} isNetwork num={index+1} bookmarklist={bookmarklist}/>
            ))}
            </Row>
      </div>
      <Row className='jusify-content-center' style={{marginLeft:"5%"}}>
        {users.map((user,index) => (
          <UserCard key={user.id} user={user} color={randomColor[index%14]} isNetwork bookmarklist={bookmarklist}/>
        ))}
      </Row>


    </Container>
  );
}

export default Network;
