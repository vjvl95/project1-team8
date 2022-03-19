import React from "react";

import EducationItem from "./EducationItem";

const EducationList = ({ isEditable, educations, getEducationList }) => {
  return (
    <>
      {educations.map((education) => {
        return (
          <EducationItem
            key={education.id}
            education={education}
            isEditable={isEditable}
            getEducationList={getEducationList}
          />
        );
      })}
    </>
  );
};

export default EducationList;
