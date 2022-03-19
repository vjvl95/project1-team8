import { Card,Row,Col} from "react-bootstrap";
import CertificateList from "./CertificateList"


function CertificateCard({setCertificateList,certificateList,isEditable,setIsAdding,portfolioOwnerId}){
  
  
    return < >
    <Card.Body>
        <Card.Title style={{textAlign:"left"}}>자격증</Card.Title>
        
        <CertificateList isEditable ={isEditable} setCertificateList ={setCertificateList} certificateList={certificateList} portfolioOwnerId={portfolioOwnerId} setIsAdding={setIsAdding}/>
        {isEditable && 
        
        <Row className="mt-3 text-center mb-4">
      <Col sm={{ span: 20 }}>
      <button type="button" className="btn btn-primary" onClick={()=>setIsAdding(true)}>+</button>
      </Col>
                  </Row>
        }

    </Card.Body>
  </>
}

export default CertificateCard
