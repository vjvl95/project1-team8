
import { Card,Col} from "react-bootstrap";
import {useEffect, useState} from 'react'
import ProjectEditForm from "./ProjectEditForm";

function ProjectItem({isEditable,setProjectList,projectList,id,title,description,from_date,to_date,portfolioOwnerId})
{
    const [isEditing,setIsEditing]=useState(false)
    const [thisProject,setThisProject]=useState({id,title,description,from_date,to_date})
    return <>
        {isEditing? <div><ProjectEditForm setIsEditing={setIsEditing} setProjectList={setProjectList}projectList={projectList} setThisProject={setThisProject} thisProject ={thisProject} id={id} portfolioOwnerId={portfolioOwnerId}/></div>
        :(<>
        <div className="justify-content-between align-items-left mb-2 row" style={{textAlign:"left"}}>
            <Col>
                {title} <br/>
                <span className="text-muted">{description}</span><br/>
                <span className="text-muted">{from_date} ~ {to_date}</span>
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