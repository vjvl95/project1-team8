import {useState, useEffect} from 'react'
import * as Api from "../../api"
import ProjectItem from "./ProjectItem"


function ProjectList({projectList,portfolioOwnerId,setIsEditing}){   
    
   return <>
    {projectList.map((project)=> {
       return( 
       <ProjectItem
        id={project.id} 
        title={project.title} 
        description={project.description} 
        from_date={project.from_date} 
        to_date={project.to_date}
        portfolioOwnerId={portfolioOwnerId}
        />
       )
    })
}
    </>
}

export default ProjectList