import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import {AiOutlineStar}  from "react-icons/ai"

function UserCard({ user, setIsEditing, isEditable, isNetwork,num ,color}) {
  const navigate = useNavigate();
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem",backgroundColor:color }}>
      <Card.Title style={{fontWeight:"bolder",textAlign:"center", marginTop:"10px"}} >{num}</Card.Title>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src="http://placekitten.com/200/200"
            alt="랜덤 고양이 사진 (http://placekitten.com API 사용)"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        <Card.Text>{user?.description}</Card.Text>

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  variant="outline-info"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}
    
        {isNetwork && (
          <Card.Link
            className="mt-3 stretched-link"
            href=""
            onClick={() => navigate(`/users/${user.id}`)}
          >
            <AiOutlineStar style={{fontSize:"30px", marginLeft:"90px"}}/>
            <span style={{fontSize:"20px", marginLeft:"5px", marginTop:"15px"}}>150</span>
          </Card.Link>
          
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
