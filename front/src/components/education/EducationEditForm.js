import { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function EducationEditForm({
  portfolioOwnerId,
  itemId,
  itemSchool,
  itemMajor,
  itemPosition,
  setNewMajor,
  setNewSchool,
  setNewPosition,
  setIsEditing,
  getEducationList,
}) {
  const [school, setSchool] = useState(itemSchool || "");
  const [major, setMajor] = useState(itemMajor || "");
  const [position, setPosition] = useState(itemPosition || "");

  const handlePutSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.put(`educations/${itemId}`, {
        school,
        major,
        position,
      });
      setNewSchool(school);
      setNewMajor(major);
      setNewPosition(position);
      setIsEditing(false);
    } catch (err) {
      console.log("수상내역을 수정하는데 실패하였습니다", err);
    }
  };

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    try {
      await Api.post(`educations/education`, {
        user_id: portfolioOwnerId,
        school,
        major,
        position,
      });
      getEducationList();
    } catch (err) {
      console.log("수상내역을 입력하는데 실패하였습니다", err);
    }
  };

  return (
    <Card.Body>
      <Form onSubmit={itemId ? handlePutSubmit : handleCreateSubmit}>
        <Form.Group controlId="useEditName" className="mb-3">
          <Form.Control
            type="text"
            placeholder="학교이름"
            value={school}
            onChange={(e) => setSchool(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="userEditEmail" className="mb-3">
          <Form.Control
            type="text"
            placeholder="전공"
            value={major}
            onChange={(e) => setMajor(e.target.value)}
          />
        </Form.Group>

        {["radio"].map((type) => (
          <div key={`inline-${type}`} className="mb-3">
            <Form.Check
              inline
              label="재학중"
              name="group1"
              type={type}
              value="재학중"
              checked={position === "재학중"}
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="학사졸업"
              name="group1"
              type={type}
              value="학사졸업"
              checked={position === "학사졸업"}
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="석사졸업"
              name="group1"
              type={type}
              value="석사졸업"
              checked={position === "석사졸업"}
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-3`}
            />
            <Form.Check
              inline
              label="박사졸업"
              name="group1"
              type={type}
              value="박사졸업"
              checked={position === "박사졸업"}
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-4`}
            />
          </div>
        ))}

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
  );
}

export default EducationEditForm;
