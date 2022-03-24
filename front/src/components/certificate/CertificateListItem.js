import { Col, Row, Button } from "react-bootstrap";
import { useState } from "react";
import CertificateEditForm from "./CertificateEditForm";
import EditButton from "../common/EditButton";
import * as API from "../../api";

function CertificateListItem({ id, isEditable, item, getCertificateList }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(item.title);
  const [newDescription, setNewDescription] = useState(item.description);
  const [newWhenDate, setNewWhenDate] = useState(new Date(item.when_date));

  const HandleDelete = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      try {
        API.delete(`certificates/${id}`);
        getCertificateList();
      } catch (err) {
        console.log("삭제 실패하였습니다.", err);
      }
    } else {
      return;
    }
  };

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
            <>
              <Col className="col-lg-1">
                <EditButton setIsEditing={setIsEditing} />
              </Col>
              <Col className="col-lg-1">
                <Button variant="danger" size="sm" onClick={HandleDelete}>
                  삭제
                </Button>
              </Col>
            </>
          )}
        </Row>
      )}
    </>
  );
}

export default CertificateListItem;
