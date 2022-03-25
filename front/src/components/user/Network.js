import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row,Card} from "react-bootstrap";
import styles from "./Network.module.css";
import { BookmarkListContext } from "../../App";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { SearchContext, UserStateContext, DispatchContext } from "../../App";
import UserTable from "./UserTable"
function Network() {
  const {setBookmarklist}=useContext(BookmarkListContext)
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const searchState = useContext(SearchContext);
  const { searchDispatch } = useContext(DispatchContext);

  const [users, setUsers] = useState([]);
  const searchInit = () => {
    searchState.search !== "" &&
      searchDispatch({
        type: "DEFAULT",
      });
  };
  const [top3,setTop3]=useState([])
  const randomColor=['#edf2fb' , '#e2eafc','#d7e3fc','#ccdbfd','#c1d3fe','#b6ccfe','#abc4ff']

  useEffect(  () => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
    searchInit();
    if (searchState.category === "all" && searchState.search === "") {
      Api.get("userlist").then((res) => setUsers(res.data));
    } else {
      Api.get(
        "userlist",
        `search?searchType=${searchState.category}&searchWord=${searchState.search}`
      )
        .then((res) => setUsers(res.data))
        .catch((e) =>
          alert(`${searchState.search}에 해당하는 검색 결과가 없습니다.  `)
        );
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
  }, [userState, navigate, searchState]);


  return (
    <Container fluid>
      <div style={{backgroundColor:"#F0F0F0", opacity: 0.95, padding:"30PX 30PX 10px 30PX",margin:"30px 0 30PX 0",borderRadius:"0px 0px 50px 50px"}}>
      <div style={{marginBottom:"70px" }}>
        <UserTable/>
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
