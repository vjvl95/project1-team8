import AwardListItem from "./AwardListItem";

const AwardList = ({ awardList, isEditable }) => {
  const awardListArray = awardList?.map((item) => {
    return (
      <AwardListItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        isEditable={isEditable}
      />
    );
  });
  return <>{awardListArray}</>;
};

export default AwardList;
