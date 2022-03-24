import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import {AiOutlineStar,AiTwotoneStar}  from "react-icons/ai"
import {useContext, useEffect, useState} from "react"
import * as Api from "../../api";
import { BookmarkListContext } from "../../App";
function UserCard({aa,portfolioOwnerId,user, setIsEditing, isEditable, isNetwork,num}) {
  const navigate = useNavigate();
  const [toggle,setToggle]= useState()
  const [count,setCount]=useState(0)
  const randomColor=['lightblue' , 'aquamarine','blanchedalmond','lightpink',' gainsboro','powderblue','azure','papayawhip','navajowhite','lavender','honeydew','lightcyan','pink','lavenderblush']
  const {bookmarklist}=useContext(BookmarkListContext)
  const index=Math.floor(Math.random()*14)

   const toggleHander = async() => {
    await Api.put("user/bookmark",{
      target:user.id,
      toggle:!toggle
    })

    setToggle(!toggle)
    toggle ?setCount(count-1):setCount(count+1)
  }

  useEffect(()=>{
    let res=""
    async function getCount(){
      user===null ?res=await Api.get(`users/${portfolioOwnerId}/bookmarkcount`) :res=await Api.get(`users/${user.id}/bookmarkcount`)
      setCount(res.data)     
    }
    console.log(index)

    getCount()     
    


    if(bookmarklist!==undefined){
     bookmarklist?.includes(user?.id) ?setToggle(true): setToggle(false) 
    }
    if(isEditable===false)
    {
      bookmarklist?.includes(portfolioOwnerId) ?setToggle(true): setToggle(false)
    }
  },[bookmarklist])

  function togglemodule()
  {
    return <>
    {toggle? <AiTwotoneStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={toggleHander}/> :<AiOutlineStar style={{fontSize:"30px", marginLeft:"90px"}} onClick={toggleHander}/>}
    <span style={{fontSize:"20px", marginLeft:"5px", marginTop:"15px"}}>{count}</span>
    </>
  }
  
  return (
    <Card className="mb-2 ms-3 mr-5" style={{ width: "18rem",backgroundColor:randomColor[index] }}>
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
          {togglemodule()}
          </>
        )}

        {!isNetwork && !isEditable && (
          <>
         {togglemodule()}
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default UserCard;
