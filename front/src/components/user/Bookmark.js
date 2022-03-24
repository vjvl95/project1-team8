import React, { useContext,useEffect, useState } from 'react';
import { Container, Row,Card } from 'react-bootstrap';
import * as Api from '../../api';
import UserCard from './UserCard';
import { BookmarkListContext } from "../../App";


function Bookmark(){
  const [users, setUsers] = useState([]);
  const {setBookmarklist}=useContext(BookmarkListContext)


    useEffect(() => {
        async function getBookmark(){
          const bookmarklist=await Api.get('user/bookmarklist')
          const res=await Api.get('user/bookmarklist_data')
          setBookmarklist(bookmarklist.data)
          setUsers(res.data)
      }
      getBookmark()
      }, []);
    
    return (
        <Container fluid>
          <Row className='jusify-content-center' style={{marginLeft:"5%"}}>
            { users.length===0?<h1 style={{marginTop:"400px", marginLeft:"650px"}}>북마크한 포토폴리오가 없습니다</h1>  
                        : users.map((user) => (
                        <UserCard key={user.id} user={user} isNetwork/>))}
          </Row>
        </Container>
      );
}


export default Bookmark 