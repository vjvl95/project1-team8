import React, { useCallback, useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
import EducationList from "./EducationList";
import EducationEditForm from "./EducationEditForm";
import PlusButton from "../common/PlusButton";

const Education = ({ portfolioOwnerId, isEditable }) => {
  // useState 훅을 통해 isEditing 상태를 생성함.
  const [isEditing, setIsEditing] = useState(false);
  const [educationList, setEducationList] = useState([]);

  const getEducationList = useCallback(() => {
    // "educationlist/:user_id" 로 GET 요청을 하고, users를 response의 data로 세팅함.
    Api.get(`educationlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      setEducationList(data);
      setIsEditing(false);
    });
  }, [portfolioOwnerId]);

  useEffect(() => {
    getEducationList();
  }, [getEducationList]);

  return (
    <Card>
      <Card.Body>
        <Card.Title className="mb-3">학력</Card.Title>
        <EducationList
          portfolioOwnerId={portfolioOwnerId}
          isEditable={isEditable}
          educationList={educationList}
          getEducationList={getEducationList}
        />

        {isEditable && (
          <Row className="mt-3 text-center mb-4">
            <Col sm={{ span: 20 }}>
              <PlusButton setIsEditing={setIsEditing} />
            </Col>
          </Row>
        )}
      </Card.Body>

      {isEditing && (
        <EducationEditForm
          portfolioOwnerId={portfolioOwnerId}
          setIsEditing={setIsEditing}
          getEducationList={getEducationList}
        />
      )}
    </Card>
  );
};

export default Education;
