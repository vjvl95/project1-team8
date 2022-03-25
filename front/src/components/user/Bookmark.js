import React, { useContext,useEffect, useState } from 'react';
import { Container, Row,Card } from 'react-bootstrap';
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
      : users.map((user) => (
      <UserCard key={user?.id} user={user} isNetwork/>))
    }
    return (
        <Container fluid>
          <Row className='jusify-content-center' style={{marginLeft:"5%"}}>
            {isLoading?bookmark_user():<div>로딩중</div>}
            
          </Row>
        </Container>
      );
}


export default Bookmark 