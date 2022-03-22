import { useState } from "react";
import { Button, Col, Row, Card } from "react-bootstrap";
import EducationEditForm from "./EducationEditForm";

const EducationListItem = ({ id, school, major, position, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newSchool, setNewSchool] = useState(school);
  const [newMajor, setNewMajor] = useState(major);
  const [newPosition, setNewPostion] = useState(position);

  return (
    <>
      {isEditing ? (
        <EducationEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemSchool={newSchool}
          itemMajor={newMajor}
          itemPosition={newPosition}
          setNewSchool={setNewSchool}
          setNewMajor={setNewMajor}
          setNewPosition={setNewPostion}
        />
      ) : (
        <Row className="align-items-center mb-3">
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
    </>
  );
};

export default EducationListItem;
