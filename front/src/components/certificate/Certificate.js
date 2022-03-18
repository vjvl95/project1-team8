import {useEffect, useState} from 'react'
import CertificateCard from "./CertificateCard"
import CertificateAddForm from "./CertificateAddForm";
import { Card} from "react-bootstrap";
import * as Api from "../../api";


function Certificate({portfolioOwnerId,isEditable}){
    const [IsAdding, setIsAdding] = useState(false);
    // useState 훅을 통해 user 상태를 생성함.
    const [certificateList,setCertificateList]=useState([])

    useEffect(()=>{
      Api.get("certificatelist", portfolioOwnerId).then((res) =>setCertificateList(res.data));
    },[])
    


    return <Card className='mb-2 ms-3 mr-5'>
    <Certificate
    setIsAdding={setIsAdding}
    isEditable={isEditable}
    portfolioOwnerId={portfolioOwnerId}
    certificateList={certificateList}
    setCertificateList={setCertificateList}
    />

    {IsAdding && (
        <CertificateAddForm
          setIsAdding={setIsAdding}
          portfolioOwnerId={portfolioOwnerId}
          setCertificateList={setCertificateList}
        />
      )}
    </Card>

}

export default Certificate
