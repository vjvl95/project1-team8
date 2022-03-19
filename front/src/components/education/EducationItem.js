import { Card, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import EducationEditForm from "./EducationEditForm";

const EducationItem = ({ education, isEditable, getEducationList }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          getEducationList={getEducationList}
          education={education}
        />
      ) : (
        <Row>
          <Col>
            <Card.Text className="mb-1">{education.school}</Card.Text>
            <Card.Text className="mb-4 text-muted">
              {education.major} ({education.position})
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
