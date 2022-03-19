import { Card,Row,Col} from "react-bootstrap";
import ProjectList from "./ProjectList"


function ProjectCard({setProjectList,projectList,isEditable,setIsAdding,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>프로젝트</Card.Title>
        
        <ProjectList isEditable ={isEditable} setProjectList ={setProjectList} projectList={projectList} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding}/>
        {isEditable && (

<Row className="mt-3 text-center mb-4">
<Col sm={{ span: 20 }}>
<button type="button" className="btn btn-primary" onClick={()=>setIsAdding(true)}>+</button>
</Col>
            </Row>
        )}
        

    </Card.Body>
  </>
}

export default ProjectCard