import {useState, useEffect} from 'react'
import * as Api from "../../api"
import ProjectItem from "./ProjectItem"


function ProjectList({portfolioOwnerId}){

    const [projectList, setProjectList] = useState([]);


    useEffect( ()=> {
        Api.get('projectlist',portfolioOwnerId).then((res)=>setProjectList(res.data))
      },[portfolioOwnerId])
    return <>
    {projectList.map((project)=> {

       return( <ProjectItem key={project.id} title={project.title} 
        description={project.description} 
        from_date={project.from_date} 
        to_date={project.to_date}/>
       )
    })
}
    </>
}

export default ProjectList