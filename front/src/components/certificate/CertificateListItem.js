import { Col, Button, Card, Row } from "react-bootstrap";
import { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";

function CertificateListItem({ id, isEditable, item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newWhenDate, setNewWenDate] = useState(new Date(item.when_date));

  return (
    <Card.Text>
      {isEditing ? (
        <CertificateEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
          itemWhenDate={newWhenDate}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
          setNewWenDate={setNewWenDate}
        />
      ) : (
        <Row className="align-items-center">
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
}

export default CertificateListItem;
