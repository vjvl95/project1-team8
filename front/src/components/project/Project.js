import {useEffect, useState} from 'react'
import ProjectCard from "./ProjectCard"
import ProjectAddForm from "./ProjectAddForm";
import { Card, Row, Button, Col } from "react-bootstrap";
import * as Api from "../../api";


function Project({portfolioOwnerId,isEditable}){
    const [IsAdding, setIsAdding] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [projectList,setProjectList]=useState([])

    useEffect(()=>{
      Api.get("projectlist", portfolioOwnerId).then((res) => setProjectList(res.data) );
    },[])
    


    return <Card className='mb-2 ms-3 mr-5'>
    <ProjectCard
    setIsAdding={setIsAdding}
    isEditable={isEditable}
    portfolioOwnerId={portfolioOwnerId}
    projectList={projectList}
    setProjectList={setProjectList}
    />

    {IsAdding && (
        <ProjectAddForm
          setIsAdding={setIsAdding}
          portfolioOwnerId={portfolioOwnerId}
          setProjectList={setProjectList}
        />
      )}
    </Card>
    
    
     






}

export default Project
