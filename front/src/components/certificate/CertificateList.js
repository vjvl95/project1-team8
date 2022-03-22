import CertificateListItem from "./CertificateListItem";

const CertificateList = ({ certificateList, isEditable }) => {
  const certificateListArray = certificateList?.map((item) => {
    return (
      <CertificateListItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        isEditable={isEditable}
      />
    );
  });
  return <>{certificateListArray}</>;
};

export default CertificateList;
