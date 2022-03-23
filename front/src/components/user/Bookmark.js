import React, { useEffect, useState } from 'react';
import { Container, Row,Card } from 'react-bootstrap';
import * as Api from '../../api';
import UserCard from './UserCard';


function Bookmark(){
  const [users, setUsers] = useState([]);
  const [bookmarklist,setBookmarklist]=useState([])
  const randomColor=['lightblue' , 'aquamarine','blanchedalmond','lightpink',' gainsboro','powderblue','azure','papayawhip','navajowhite','lavender','honeydew','lightcyan','pink','lavenderblush']


    useEffect(() => {
        async function getUser(){
          const bookmarklist=await Api.get('user/bookmarklist')
          const res=await Api.get('user/bookmarklist_data')
          setBookmarklist(bookmarklist.data)
          setUsers(res.data)
          console.log(users)
      }
      getUser()
      }, []);
    
    return (
        <Container fluid>
          <Row className='jusify-content-center' style={{marginLeft:"5%"}}>
            { users.length===0?<h1 style={{marginTop:"400px", marginLeft:"650px"}}>북마크한 포토폴리오가 없습니다</h1>  
                        : users.map((user,index) => (
                        <UserCard key={user.id} user={user} color={randomColor[index%14]} isNetwork bookmarklist={bookmarklist}/>))}
          </Row>
        </Container>
      );
}


export default Bookmark 