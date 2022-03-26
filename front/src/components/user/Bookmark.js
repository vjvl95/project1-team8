import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Spinner } from "react-bootstrap";
import * as Api from "../../api";
import UserCard from "./UserCard";
import { BookmarkListContext } from "../../App";

function Bookmark() {
  const [users, setUsers] = useState([]);
  const { setBookmarklist } = useContext(BookmarkListContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getBookmark() {
      const bookmarklist = await Api.get("user/bookmarklist");      
      const { data } = await Api.get('user/bookmarklist_data');
      const newData = data.filter((user) => user);
      setBookmarklist(bookmarklist.data);
      setUsers(newData);
    }
    getBookmark();
    setIsLoading(false);
  }, []);
  function bookmark_user() {
    return users.length === 0 ? (
      <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner
            animation="border"
            variant="primary"
            style={{ marginTop: "300px", justifyContent: "center" }}
          />
        </div>
    ) : (
      users.map((user) => (
        <UserCard
          bookmarkMargin={"100px"}
          key={user?.id}
          user={user}
          isNetwork
        />
      ))
    );
  }
  return (
    <Container fluid>
      <Row xs='auto' className='justify-content-center'>
        {bookmark_user()}
      </Row>
    </Container>
  );
}

export default Bookmark;
