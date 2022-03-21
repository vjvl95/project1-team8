import {useEffect, useState} from 'react'
import CertificateCard from "./CertificateCard"
import CertificateEditForm from "./CertificateEditForm";
import {Card, Row, Col} from "react-bootstrap";
import * as Api from "../../api";


function Certificate({portfolioOwnerId,isEditable}){
    const [IsEditing, setIsEditing] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [certificateList,setCertificateList]=useState([])

    useEffect(()=>{
      Api.get("certificatelist", portfolioOwnerId).then((res) =>setCertificateList(res.data));
    },[])
    


    return <Card>
    <CertificateCard
    setIsEditing={setIsEditing}
    isEditable={isEditable}
    portfolioOwnerId={portfolioOwnerId}
    certificateList={certificateList}
    setCertificateList={setCertificateList}
    />

    {IsEditing && (
        <CertificateEditForm
          setIsEditing={setIsAdding}
          portfolioOwnerId={portfolioOwnerId}
          setCertificateList={setCertificateList}
        />
      )}
    </Card>

}

export default Certificate
