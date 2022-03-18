import React, { useCallback, useState, useLayoutEffect } from "react";
import { Card } from "react-bootstrap";

// import * as Api from "../../api";
import * as Api from "../../api";

import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [educations, setEducations] = useState([]);

  const getEducationList = useCallback(() => {
    // "educationlist/:user_id" 로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get(`educationlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setEducations(data);
    });
  }, [portfolioOwnerId]);

  useLayoutEffect(() => {
    getEducationList();
  }, [getEducationList]);

  return (
    <>
      <Card>
        <EducationCard
          portfolioOwnerId={portfolioOwnerId}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
          educations={educations}
          getEducationList={getEducationList}
        />

        {isEditing && (
          <EducationEditForm
            portfolioOwnerId={portfolioOwnerId}
            setIsEditing={setIsEditing}
            getEducationList={getEducationList}
          />
        )}
      </Card>
    </>
  );
};

export default Education;
