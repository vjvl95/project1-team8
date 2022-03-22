import { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import DatePicker from "react-datepicker";
import * as Api from "../../api";

function ProjectEditForm({
  portfolioOwnerId,
  itemId,
  itemTitle,
  itemDescription,
  itemFromDate,
  itemToDate,
  setNewDescription,
  setNewTitle,
  setNewFromDate,
  setNewToDate,
  setIsEditing,
  getProjectList,
}) {
  const [title, setTitle] = useState(itemTitle || "");
  const [description, setDescription] = useState(itemDescription || "");
  const [fromDate, setFromDate] = useState(itemFromDate || new Date());
  const [toDate, setToDate] = useState(itemToDate || new Date());

  const handlePutSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`projects/${itemId}`, {
        title,
        description,
        from_date: fromDate.toISOString().substring(0, 10),
        to_date: toDate.toISOString().substring(0, 10),
      });
      setNewTitle(title);
      setNewDescription(description);
      setNewFromDate(fromDate);
      setNewToDate(toDate);
      setIsEditing(false);
    } catch (err) {
      console.log("프로젝트를 수정하는데 실패하였습니다", err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`projects/project`, {
        user_id: portfolioOwnerId,
        title,
        description,
        from_date: fromDate.toISOString().substring(0, 10),
        to_date: toDate.toISOString().substring(0, 10),
      });
      getProjectList();
    } catch (err) {
      console.log("프로젝트를 입력하는데 실패하였습니다", err);
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
                selected={fromDate}
                onChange={(date) => setFromDate(date)}
              />
            </Col>
            <Col className="col-auto">
              <DatePicker
                selected={toDate}
                onChange={(date) => setToDate(date)}
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

export default ProjectEditForm;
