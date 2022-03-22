import CertificateListItem from "./CertificateListItem";

const CertificateList = ({
  certificateList,
  isEditable,
  getCertificateList,
}) => {
  const certificateListArray = certificateList?.map((item) => {
    return (
      <CertificateListItem
        key={item.id}
        id={item.id}
        item={item}
        isEditable={isEditable}
        getCertificateList={getCertificateList}
      />
    );
  });
  return <>{certificateListArray}</>;
};

export default CertificateList;
