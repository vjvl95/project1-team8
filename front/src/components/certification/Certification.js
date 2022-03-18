import {useEffect, useState} from 'react'
import CertificationCard from "./CertificationCard"
import CertificationAddForm from "./CertificationAddForm";
import { Card} from "react-bootstrap";
import * as Api from "../../api";


function Certification({portfolioOwnerId,isEditable}){
    const [IsAdding, setIsAdding] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [certificateList,setCertificateList]=useState([])

    useEffect(()=>{
      Api.get("certificatelist", portfolioOwnerId).then((res) =>setCertificateList(res.data));
    },[])
    


    return <Card className='mb-2 ms-3 mr-5'>
    <CertificationCard
    setIsAdding={setIsAdding}
    isEditable={isEditable}
    portfolioOwnerId={portfolioOwnerId}
    certificateList={certificateList}
    setCertificateList={setCertificateList}
    />

    {IsAdding && (
        <CertificationAddForm
          setIsAdding={setIsAdding}
          portfolioOwnerId={portfolioOwnerId}
          setCertificateList={setCertificateList}
        />
      )}
    </Card>

}

export default Certification
