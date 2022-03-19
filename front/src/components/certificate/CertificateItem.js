
import { Col} from "react-bootstrap";
import { useState} from 'react'
import CertificateEditForm from "./CertificateEditForm";

function CertificateItem({isEditable,setCertificateList,certificate,portfolioOwnerId})
{
    const [isEditing,setIsEditing]=useState(false)
    const [ThisCertificate,setThisCertificate]=useState(certificate)

    return <>
        {isEditing? <div><CertificateEditForm setIsEditing={setIsEditing} setCertificateList={setCertificateList} setThisCertificate={setThisCertificate} ThisCertificate ={ThisCertificate} id={certificate.id} portfolioOwnerId={portfolioOwnerId}/></div>
        :(<>
        <div className="justify-content-between align-items-left mb-2 row" style={{textAlign:"left"}}>
            <Col>
                {certificate.title} <br/>
                <span className="text-muted">{certificate.description}</span><br/>
                <span className="text-muted">{certificate.when_date}</span>
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

export default CertificateItem
