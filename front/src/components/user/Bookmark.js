import React, { useContext,useEffect, useState } from 'react';
import { Container, Row,Spinner } from 'react-bootstrap';
import * as Api from '../../api';
import UserCard from './UserCard';
import { BookmarkListContext } from "../../App";


function Bookmark(){
  const [users, setUsers] = useState([]);
  const {setBookmarklist}=useContext(BookmarkListContext)
  const [isLoading,setIsLoading]=useState(false)


    useEffect(() => {
        async function getBookmark(){
          const bookmarklist=await Api.get('user/bookmarklist')
          const res=await Api.get('user/bookmarklist_data')
          setBookmarklist(bookmarklist.data)
          setUsers(res.data)
      }
      getBookmark()
      setIsLoading(true)
      }, []);
    function bookmark_user()
    {
      return users.length===0?<h1 style={{marginTop:"400px", marginLeft:"650px"}}>북마크한 포토폴리오가 없습니다</h1>  
      : users.map((user) => (<UserCard bookmarkMargin={"100px"}key={user?.id} user={user} isNetwork/>))
    }
    return (
        <Container fluid>
          <Row className='jusify-content-center'>
            {isLoading  ?<div style={{display:'flex',flexDirection:"column",justifyContent:"center", alignItems:"center"}}><Spinner animation="border" variant="primary" style={{marginTop:"300px",justifyContent:"center"}} /> </div>: <div>3</div>}
          </Row>
        </Container>
      );
}


export default Bookmark 