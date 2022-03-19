
import ProjectItem from "./ProjectItem"


function ProjectList({setProjectList,projectList,portfolioOwnerId,isEditable}){   
    
   return <>
    {projectList.map((project)=> {
       return( 
       <ProjectItem
        key={project.id}
        project={project}
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