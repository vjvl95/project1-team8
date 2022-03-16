import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";


function ProjectCard({setIsEditing,project,isEditable}){


    return <Card >
    <Card.Body>
        <Card.Title>프로젝트</Card.Title>
        <Card.Body>
          <button type="button" class="btn btn-primary" onClick={()=>setIsEditing(true)}>+</button>
        </Card.Body>
        
    </Card.Body>
  </Card>
}

export default ProjectCard