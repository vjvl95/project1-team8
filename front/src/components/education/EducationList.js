import React from "react";

import EducationItem from "./EducationItem";

const EducationList = ({
  portfolioOwnerId,
  isEditable,
  educations,
  getEducationList,
}) => {
  return (
    <>
      {educations.map((education) => {
        return (
          <EducationItem
            key={education.id}
            school={education.school}
            major={education.major}
            position={education.position}
            id={education.id}
            isEditable={isEditable}
            getEducationList={getEducationList}
          />
        );
      })}
    </>
  );
};

export default EducationList;
