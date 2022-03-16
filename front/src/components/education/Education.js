import React, { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
// import * as Api from "../../api";
import EducationCard from "./EducationCard";
import EducationEditForm from "./EducationEditForm";

const Education = ({ portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  // useState 훅을 통해 user 상태를 생성함.
  // const [user, setUser] = useState(null);

  //  useEffect(() => {
  //    // "users/유저id" 엔드포인트로 GET 요청을 하고, user를 response의 data로 세팅함.
  //    Api.get("users", portfolioOwnerId).then((res) => setUser(res.data));
  //  }, [portfolioOwnerId]);

  return (
    <>
      <Card>
        <EducationCard
          // user={user}
          setIsEditing={setIsEditing}
          isEditable={isEditable}
        />

        {isEditing && (
          <EducationEditForm
            // user={user}
            setIsEditing={setIsEditing}
            // setUser={setUser}
          />
        )}
      </Card>
    </>
  );
};

export default Education;
