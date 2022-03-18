import { Card} from "react-bootstrap";
import CertificationList from "./CertificationList"


function CertificationCard({setCertificateList,certificateList,isEditable,setIsAdding,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>프로젝트</Card.Title>
        
        <CertificationList isEditable ={isEditable} setCertificateList ={setCertificateList} certificateList={certificateList} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding}/>
        {isEditable && <button type="button" className="btn btn-primary" onClick={()=>setIsAdding(true)}>+</button>}

    </Card.Body>
  </>
}

export default CertificationCard
