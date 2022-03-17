import { Card, Container, Row, Button, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Api from "../../api";

import EducationItem from "./EducationItem";

const EducationList = ({ portfolioOwnerId }) => {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    // "educationlist/:user_id" 로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get("educationlist", portfolioOwnerId).then((res) =>
      setEducations(res.data)
    );
  }, [educations]);

  return (
    <>
      {educations.map((education) => {
        return (
          <Container>
            <EducationItem
              key={education.id}
              school={education.school}
              major={education.major}
              position={education.position}
              id={education.id}
            />
          </Container>
        );
      })}
    </>
  );
};

export default EducationList;
