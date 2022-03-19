import React, { useState } from "react";
import { Button, Form, Card, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

const EducationEditForm = ({
  education,
  setIsEditing,
  setfetchSchool,
  setFetchMajor,
  setFetchPosition,
  getEducationList = { getEducationList },
}) => {
  const [school, setSchool] = useState(education.school);
  const [major, setMajor] = useState(education.major);
  const [position, setPosition] = useState(education.position);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //"educations/:id" 엔드포인트로 PUT 요청함.
    await Api.put(`educations/${education.id}`, {
      school,
      major,
      position,
    });

    setfetchSchool(school);
    setFetchMajor(major);
    setFetchPosition(position);

    getEducationList();

    //isEditing을 false로 세팅함.
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
};

export default EducationEditForm;
