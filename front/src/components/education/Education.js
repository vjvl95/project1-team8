import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import * as Api from "../../api";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      <Card>
        <EducationCard
          portfolioOwnerId={portfolioOwnerId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />

        {isEditing && (
          <EducationEditForm
            portfolioOwnerId={portfolioOwnerId}
            setIsEditing={setIsEditing}
          />
        )}
      </Card>
    </>
  );
};

export default Education;
