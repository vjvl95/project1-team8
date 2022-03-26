import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import { AiOutlineStar, AiTwotoneStar } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import * as Api from "../../api";
import { BookmarkListContext } from "../../App";
import EditButton from "../common/EditButton";
function UserCard({
  portfolioOwnerId,
  user,
  setIsEditing,
  isEditable,
  bookmarkMargin,
  isNetwork,
  num,
}) {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState();
  const [count, setCount] = useState(0);
  const { bookmarklist } = useContext(BookmarkListContext);

  const toggleHander = async () => {
    await Api.put("user/bookmark", {
      target: user.id,
      toggle: !toggle,
    });

    setToggle(!toggle);
    toggle ? setCount(count - 1) : setCount(count + 1);
  };

  useEffect(() => {
    let res = "";
    async function getCount() {
      user === null
        ? (res = await Api.get(`users/${portfolioOwnerId}/bookmarkcount`))
        : (res = await Api.get(`users/${user.id}/bookmarkcount`));
      setCount(res.data);
    }

    getCount();

    if (bookmarklist !== undefined) {
      bookmarklist?.includes(user?.id) ? setToggle(true) : setToggle(false);
    }
    if (isEditable === false) {
      bookmarklist?.includes(portfolioOwnerId)
        ? setToggle(true)
        : setToggle(false);
    }
  }, [bookmarklist]);

  function togglemodule() {
    return (
      <div style={{justifyContent:"center",display:"flex"}}>
        {toggle ? (
          <AiTwotoneStar
            style={{ fontSize: "30px"}}
            onClick={toggleHander}
          />
        ) : (
          <AiOutlineStar
            style={{ fontSize: "30px"}}
            onClick={toggleHander}
          />
        )}
        

        
          {count} 
      </div>
    );
  }

  return (
    <Card
      className="mb-2 ms-3 mr-5"
      style={{
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        width: "20rem",
        borderRadius: "10px",
        marginTop: bookmarkMargin,
        background: "linear-gradient(	#c0c0c0 50%, white 50%)",
      }}
    >
    
      <Card.Body>
       
          <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "160px", height: "130px" }}
            className="mb-3"
            src="/image/profile.PNG"
            alt="프로필 사진"
          />
                  </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description.length>=10 && isNetwork===true ?<span>{user?.description.slice(0,17)} ...</span>:user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <EditButton setIsEditing={setIsEditing} />
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}}>
            <Button onClick={() => navigate(`/users/${user.id}`)}>
              상세보기
            </Button>
            {togglemodule()}

          </div>
        )}

        {!isNetwork && !isEditable && <>{togglemodule()}</>}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
