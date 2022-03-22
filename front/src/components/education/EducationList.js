import EducationListItem from "./EducationListItem";

const EducationList = ({ educationList, isEditable }) => {
  const educationListArray = educationList?.map((item) => {
    return (
      <EducationListItem
        key={item.id}
        id={item.id}
        school={item.school}
        major={item.major}
        position={item.position}
        isEditable={isEditable}
      />
    );
  });
  return <>{educationListArray}</>;
};

export default EducationList;
