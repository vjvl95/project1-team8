import { Card, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import EducationItemForm from "./EducationItemForm";

const EducationItem = ({
  education,
  isEditable,
  getEducationList,
  portfolioOwnerId,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationItemForm
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
            <Col>
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
