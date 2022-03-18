
import { Col} from "react-bootstrap";
import { useState} from 'react'
import CertificationEditForm from "./CertificationEditForm";

function CertificationItem({isEditable,setCertificateList,certification,portfolioOwnerId})
{
    const [isEditing,setIsEditing]=useState(false)
    const [ThisCertification,setThisCertification]=useState(certification)

    return <>
        {isEditing? <div><CertificationEditForm setIsEditing={setIsEditing} setCertificateList={setCertificateList} setThisCertification={setThisCertification} ThisCertification ={ThisCertification} id={certification.id} portfolioOwnerId={portfolioOwnerId}/></div>
        :(<>
        <div className="justify-content-between align-items-left mb-2 row" style={{textAlign:"left"}}>
            <Col>
                {certification.title} <br/>
                <span className="text-muted">{certification.description}</span><br/>
                <span className="text-muted">{certification.when_date}</span>
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

export default CertificationItem
