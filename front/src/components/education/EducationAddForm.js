import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationAddForm = ({
  portfolioOwnerId,
  setIsEditing,
  getEducationList,
}) => {
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [position, setPosition] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // "education/create" 엔드포인트로 POST 요청함.
    const res = await Api.post("education/create", {
      user_id: portfolioOwnerId,
      school,
      major,
      position,
    });

    getEducationList();

    // isEditing을 false로 세팅함.
    setIsEditing(false);
  };

  return (
    <Card.Body>
      <Form onSubmit={handleSubmit}>
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
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-1`}
            />
            <Form.Check
              inline
              label="학사졸업"
              name="group1"
              type={type}
              value="학사졸업"
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-2`}
            />
            <Form.Check
              inline
              label="석사졸업"
              name="group1"
              type={type}
              value="석사졸업"
              onChange={(e) => setPosition(e.target.value)}
              id={`inline-${type}-3`}
            />
            <Form.Check
              inline
              label="박사졸업"
              name="group1"
              type={type}
              value="박사졸업"
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
};

export default EducationAddForm;
