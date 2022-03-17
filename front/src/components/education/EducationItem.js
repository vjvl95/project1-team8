import { Card, Container, Button } from "react-bootstrap";
import React from "react";

const EducationItem = ({ school, major, position }) => {
  return (
    <>
      <Card.Text className="mb-1">{school}</Card.Text>
      <Card.Text className="mb-4 text-muted">
        {major} ({position})
      </Card.Text>
    </>
  );
};

export default EducationItem;
