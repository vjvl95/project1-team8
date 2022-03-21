import { useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import EducationEditForm from "./EducationEditForm";

const EducationListItem = ({ id, school, major, position, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSchool, setNewSchool] = useState(school);
  const [newMajor, setNewMajor] = useState(major);
  const [newPosition, setNewPostion] = useState(position);

  return (
    <Card.Text>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemSchool={newSchool}
          itemMajor={newMajor}
          setNewSchool={setNewSchool}
          setNewMajor={setNewMajor}
          setNewPostion={setNewPostion}
        />
      ) : (
        <Row className="align-items-center">
          <Col>
            <span>{newSchool}</span>
            <br />
            <span className="text-muted">
              {newMajor} ({newPosition})
            </span>
          </Col>

          {isEditable && (
            <Col className="col-lg-1">
              <Button
                variant="outline-info"
                size="sm"
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Card.Text>
  );
};

export default EducationListItem;
