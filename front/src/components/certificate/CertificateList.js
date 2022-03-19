import CertificateItem from "./CertificateItem"


function CertificateList({setCertificateList,certificateList,portfolioOwnerId,isEditable}){   
    
   return <>
    {certificateList.map((certificate)=> {
       return( 
       <CertificateItem
        key={certificate.id}
        certificate={certificate}
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

export default CertificateList
