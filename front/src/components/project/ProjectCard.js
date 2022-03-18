import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import ProjectList from "./ProjectList"


function ProjectCard({setProjectList,projectList,setIsEditing,isEditable,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>프로젝트</Card.Title>
        
        <ProjectList setProjectList ={setProjectList}projectList={projectList} portfolioOwnerId={portfolioOwnerId} setIsEditing={setIsEditing}/>
        <button type="button" className="btn btn-primary" onClick={()=>setIsEditing(true)}>+</button>

    </Card.Body>
  </>
}

export default ProjectCard