import { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardEditForm({
  portfolioOwnerId,
  itemId,
  itemTitle,
  itemDescription,
  setNewDescription,
  setNewTitle,
  setIsEditing,
  getAwardList,
}) {
  const [title, setAward] = useState(itemTitle || "");
  const [description, setDescription] = useState(itemDescription || "");

  const handlePutSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`awards/${itemId}`, {
        title,
        description,
      });
      setNewTitle(title);
      setNewDescription(description);
      setIsEditing(false);
    } catch (err) {
      console.log("수상내역을 수정하는데 실패하였습니다", err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`awards/award`, {
        user_id: portfolioOwnerId,
        title,
        description,
      });
      getAwardList();
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
              placeholder="수상내역"
              value={title}
              onChange={(e) => setAward(e.target.value)}
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

export default AwardEditForm;
