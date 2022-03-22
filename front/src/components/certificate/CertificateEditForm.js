import { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function CertificateEditForm({
  portfolioOwnerId,
  itemId,
  itemTitle,
  itemDescription,
  itemWhenDate,
  setNewDescription,
  setNewTitle,
  setNewWenDate,
  setIsEditing,
  getCertificateList,
}) {
  const [title, setTitle] = useState(itemTitle || "");
  const [description, setDescription] = useState(itemDescription || "");
  const [whenDate, setWhenDate] = useState(itemWhenDate || new Date());

  const handlePutSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`certificates/${itemId}`, {
        title,
        description,
        when_date: whenDate.toISOString().substring(0, 10),
      });
      setNewTitle(title);
      setNewDescription(description);
      setNewWenDate(whenDate);
      setIsEditing(false);
    } catch (err) {
      console.log("수상내역을 수정하는데 실패하였습니다", err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`certificate/create`, {
        user_id: portfolioOwnerId,
        title,
        description,
        when_date: whenDate.toISOString().substring(0, 10),
      });
      getCertificateList();
    } catch (err) {
      console.log("수상내역을 입력하는데 실패하였습니다", err);
    }
  };

  return (
    <>
      <Card.Body>
        <Form onSubmit={itemId ? handlePutSubmit : handleCreateSubmit}>
          <Form.Group controlId="useEditName" className="mb-3">
            <Form.Control
              type="text"
              placeholder="프로젝트 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="userEditEmail" className="mb-3">
            <Form.Control
              type="description"
              placeholder="상세내역"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mt-3 row">
            <Col className="col-auto">
              <DatePicker
                selected={whenDate}
                onChange={(date) => setWhenDate(date)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mt-3 text-center">
            <Col sm={{ span: 20 }}>
              <Button variant="primary" type="submit" className="me-3">
                확인
              </Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                취소
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </Card.Body>
    </>
  );
}

export default CertificateEditForm;
