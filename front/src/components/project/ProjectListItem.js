import { Col, Button, Row } from "react-bootstrap";
import { useState } from "react";
import ProjectEditForm from "./ProjectEditForm";
import EditButton from "../EditButton";

function ProjectListItem({ id, isEditable, item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newFromDate, setNewFromDate] = useState(new Date(item.from_date));
  const [newToDate, setNewToDate] = useState(new Date(item.to_date));

  return (
    <>
      {isEditing ? (
        <ProjectEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
          itemFromDate={newFromDate}
          itemToDate={newToDate}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
          setNewFromDate={setNewFromDate}
          setNewToDate={setNewToDate}
        />
      ) : (
        <Row className="align-items-center mb-3">
          <Col>
            <span>{newTitle}</span>
            <br />
            <span className="text-muted">{newDescription}</span>
            <br />
            <span className="text-muted">
              {newFromDate.toISOString().substring(0, 10)} ~{" "}
              {newToDate.toISOString().substring(0, 10)}
            </span>
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
}

export default ProjectListItem;
