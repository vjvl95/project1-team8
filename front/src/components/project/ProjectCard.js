import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectList from "./ProjectList"


function ProjectCard({setIsEditing,isEditable,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>프로젝트</Card.Title>
        <ProjectList portfolioOwnerId={portfolioOwnerId}/>
        <button type="button" class="btn btn-primary" onClick={()=>setIsEditing(true)}>+</button>

    </Card.Body>
  </>
}

export default ProjectCard