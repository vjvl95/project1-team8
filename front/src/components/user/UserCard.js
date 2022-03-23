import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import {AiOutlineStar,AiTwotoneStar}  from "react-icons/ai"
import {useEffect, useState} from "react"
import * as Api from "../../api";
import {BiRefresh} from "react-icons/bi"

function UserCard({ user, setIsEditing, isEditable, isNetwork,num ,color,bookmarklist}) {
  const navigate = useNavigate();
  const [toggle,setToggle]= useState()
  const [count,setCount]=useState(0)

   const clickHander = async() => {
    await Api.put("user/bookmark",{
      target:user.id,
      toggle:!toggle
    })

    setToggle(!toggle)
    toggle ?setCount(count-1):setCount(count+1)
  }

  useEffect(()=>{
    if(bookmarklist!==undefined){
      bookmarklist.includes(user.id) ?setToggle(true): setToggle(false)
      async function getCount(){
        const res=await Api.get(`users/${user.id}/bookmarkcount`)
        console.log(res)
        setCount(res.data)
      }
      getCount()

    }
    
  },[])
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
         )
      
        }

        {isNetwork && ( <>
         
           <Button  onClick={() => navigate(`/users/${user.id}`)}>상세보기</Button>
         
           {toggle? <AiTwotoneStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={clickHander}/> :<AiOutlineStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={clickHander}/>}
           <span style={{fontSize:"20px", marginLeft:"5px", marginTop:"15px"}}>{count}</span>
          </>
        )}

        {!isNetwork && !isEditable && (
          <>
          {toggle? <AiTwotoneStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={clickHander}/> :<AiOutlineStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={clickHander}/>}
          <span style={{fontSize:"20px", marginLeft:"5px", marginTop:"15px"}}>{count}</span>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
