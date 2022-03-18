import { Card, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";
import EducationItemForm from "./EducationItemForm";

const EducationItem = ({ id, school, major, position, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <>
      {isEditing ? (
        <EducationItemForm id={id} setIsEditing={setIsEditing} />
      ) : (
        <Row>
          <Col>
            <Card.Text className="mb-1">{school}</Card.Text>
            <Card.Text className="mb-4 text-muted">
              {major} ({position})
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
