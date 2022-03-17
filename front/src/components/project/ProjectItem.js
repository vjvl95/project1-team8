
import { Card,Col} from "react-bootstrap";


function ProjectItem({title,description,from_date,to_date})
{
    return <>
        <Card.Text>
        <div class="justify-content-between align-items-left mb-2 row" style={{textAlign:"left"}}>
            <Col>
                {title} <br/>
                <span class="text-muted">{description}</span><br/>
                <span class="text-muted">{from_date} ~ {to_date}</span>
            </Col>

            <div class="col-lg-1 col">
            <button type="button" class="mr-3 btn btn-outline-info btn-sm">편집</button>
            </div>
        </div>

        </Card.Text>       
    </>

}

export default ProjectItem