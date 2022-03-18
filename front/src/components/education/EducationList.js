import { Card, Container, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import * as Api from "../../api";

import EducationItem from "./EducationItem";

const EducationList = ({ portfolioOwnerId, isEditable }) => {
  const [educations, setEducations] = useState([]);

  const getEducationList = useCallback(() => {
    // "educationlist/:user_id" 로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get(`educationlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setEducations(data);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    getEducationList();
  }, [getEducationList]);

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
          />
        );
      })}
    </>
  );
};

export default EducationList;
