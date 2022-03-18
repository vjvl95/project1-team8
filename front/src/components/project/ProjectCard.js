import { Card} from "react-bootstrap";
import ProjectList from "./ProjectList"


function ProjectCard({setProjectList,projectList,isEditable,setIsAdding,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>프로젝트</Card.Title>
        
        <ProjectList isEditable ={isEditable} setProjectList ={setProjectList} projectList={projectList} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding}/>
        {isEditable && <button type="button" className="btn btn-primary" onClick={()=>setIsAdding(true)}>+</button>}

    </Card.Body>
  </>
}

export default ProjectCard