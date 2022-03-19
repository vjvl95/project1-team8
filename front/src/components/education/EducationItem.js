import { Card, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import EducationEditForm from "./EducationEditForm";

const EducationItem = ({ education, isEditable, getEducationList }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [fetchSchool, setfetchSchool] = useState(education.school);
  const [fetchMajor, setFetchMajor] = useState(education.major);
  const [fetchPosition, setFetchPosition] = useState(education.position);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          education={education}
          setfetchSchool={setfetchSchool}
          setFetchMajor={setFetchMajor}
          setFetchPosition={setFetchPosition}
          getEducationList={getEducationList}
        />
      ) : (
        <Row>
          <Col>
            <Card.Text className="mb-1">{fetchSchool}</Card.Text>
            <Card.Text className="mb-4 text-muted">
              {fetchMajor} ({fetchPosition})
            </Card.Text>
          </Col>
          {isEditable && (
            <Col xs lg="1">
              <Button
                className="mt-3"
                variant="outline-info"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default EducationItem;
