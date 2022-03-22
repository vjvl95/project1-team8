import { Col, Button, Card, Row } from "react-bootstrap";
import { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";
import EditButton from "../EditButton";

function CertificateListItem({ id, isEditable, item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newWhenDate, setNewWhenDate] = useState(new Date(item.when_date));

  return (
    <>
      {isEditing ? (
        <CertificateEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
          itemWhenDate={newWhenDate}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
          setNewWhenDate={setNewWhenDate}
        />
      ) : (
        <Row className="align-items-center mb-3">
          <Col>
            <span>{newTitle}</span>
            <br />
            <span className="text-muted">{newDescription}</span>
            <br />
            <span className="text-muted">
              {newWhenDate.toISOString().substring(0, 10)}
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

export default CertificateListItem;
