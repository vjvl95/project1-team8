import {useEffect, useState} from 'react'
import ProjectCard from "./ProjectCard"
import ProjectEditForm from "./ProjectEditForm";
import { Card, Row, Button, Col } from "react-bootstrap";


function Project({portfolioOwnerId,isEditable}){
    const [isEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.

   


    return <Card className='mb-2 ms-3 mr-5'>
    <ProjectCard
    setIsEditing={setIsEditing}
    isEditable={isEditable}
    portfolioOwnerId={portfolioOwnerId}
    />

    {isEditing && (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </Card>
    
    
     






}

export default Project
