import CertificationItem from "./CertificationItem"


function CertificationList({setCertificateList,certificateList,portfolioOwnerId,isEditable}){   
    
   return <>
    {certificateList.map((certificate)=> {
       return( 
       <CertificationItem
        key={certificate.id}
        project={certificate}
        portfolioOwnerId={portfolioOwnerId}
        certificateList={certificateList}
        setCertificateList={setCertificateList}
        isEditable={isEditable}
        />
       )
    })
}
    </>
}

export default CertificationList
