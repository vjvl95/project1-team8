
import { Col} from "react-bootstrap";
import { useState,useEffect} from 'react'
import ProjectEditForm from "./ProjectEditForm";

function ProjectItem({isEditable,setProjectList,project,portfolioOwnerId})
{
    const [isEditing,setIsEditing]=useState(false)
    const [thisProject,setThisProject]=useState(project)

    useEffect(()=>{console.log(thisProject)},[])
    return <>
        {isEditing? <div><ProjectEditForm setIsEditing={setIsEditing} setProjectList={setProjectList} setThisProject={setThisProject} thisProject ={thisProject} id={project.id} portfolioOwnerId={portfolioOwnerId}/></div>
        :(<>
        <div className="justify-content-between align-items-left mb-2 row" style={{textAlign:"left"}}>
            <Col>
                {project.title} <br/>
                <span className="text-muted">{project.description}</span><br/>
                <span className="text-muted">{project.from_date} ~ {project.to_date}</span>
            </Col>

            {isEditable &&
            <div className="col-lg-1 col">
             <button type="button" className="mr-3 btn btn-outline-info btn-sm" onClick={()=>setIsEditing(true)}>편집</button>
            </div>
            }
        </div>

        </>
        )
}       
    </>
}

export default ProjectItem