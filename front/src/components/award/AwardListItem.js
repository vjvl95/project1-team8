// import AwardEditForm from "./AwardEditForm";
import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import AwardEditForm from "./AwardEditForm";
import EditButton from "../EditButton";

const AwardListItem = ({ id, title, description, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  return (
    <>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
      ) : (
        <Row className="align-items-center mb-3">
          <Col>
            <span>{newTitle}</span>
            <br />
            <span className="text-muted">{newDescription}</span>
          </Col>

          {isEditable && (
            <Col className="col-lg-1">
              <EditButton setIsEditing={setIsEditing} />
            </Col>
          )}
        </Row>
      )}
    </>
  );
};

export default AwardListItem;
