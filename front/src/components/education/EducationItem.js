import { Card, Col, Row, Button } from "react-bootstrap";
import React, { useState } from "react";

const EducationItem = ({ school, major, position }) => {
  const [editing, setEditing] = useState(false);

  const Test = () => {
    return <h>hi</h>;
  };

  return (
    <Row>
      {editing ? (
        <Test />
      ) : (
        <Col>
          <Card.Text className="mb-1">{school}</Card.Text>
          <Card.Text className="mb-4 text-muted">
            {major} ({position})
          </Card.Text>
        </Col>
      )}

      <Col>
        <Button
          variant="outline-info"
          size="sm"
          onClick={() => setEditing(true)}
        >
          편집
        </Button>
      </Col>
    </Row>
  );
};

export default EducationItem;
