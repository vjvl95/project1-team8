import {useEffect, useState} from 'react'
import ProjectCard from "./ProjectCard"
import ProjectEditForm from "./ProjectEditForm";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from '../../api';


function Project({portfolioOwnerId,isEditable}){
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [projectList, setProjectList] = useState(null);

    useEffect(()=>{
        Api.get('projectlist',portfolioOwnerId).then((res)=>setProjectList(res.data))
    },[portfolioOwnerId])

    return <Card className='mb-2 ms-3 mr-5' style={{}}>
    <ProjectCard
    setIsEditing={setIsEditing}
    projectList={projectList}
    isEditable={isEditable}
    />

    {isEditing && (
        <ProjectEditForm
          setProjectList={setProjectList}
          projectList={projectList}
          setIsEditing={setIsEditing}
        />
      )}
    </Card>
    
    
     






}

export default Project
