import {useState, useEffect} from 'react'
import * as Api from "../../api"
import ProjectItem from "./ProjectItem"


function ProjectList({setProjectList,projectList,portfolioOwnerId,isEditable}){   
    
   return <>
    {projectList.map((project)=> {
       return( 
       <ProjectItem
        key={project.id}
        id={project.id} 
        title={project.title} 
        description={project.description} 
        from_date={project.from_date} 
        to_date={project.to_date}
        portfolioOwnerId={portfolioOwnerId}
        projectList={projectList}
        setProjectList={setProjectList}
        isEditable={isEditable}
        />
       )
    })
}
    </>
}

export default ProjectList