import { Col, Button, Care, Row } from "react-bootstrap";
import { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";

function CertificateListItem({ id, isEditable, title, description, whenDate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newWhenDate, setNewWenDate] = useState(whenDate);

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
            <span className="text-muted">{newWhenDate}</span>
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
