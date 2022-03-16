import { Card, Row, Button, Col } from "react-bootstrap";

const EducationCard = ({ setIsEditing, isEditable }) => {
  return (
    <Card.Body>
      <Card.Title>학력</Card.Title>
      <Card.Subtitle>ㅇㅇ대학교</Card.Subtitle>
      <Card.Text className="text-muted">ㅇㅇ전공</Card.Text>

      {isEditable && (
        <Col>
          <Row className="mt-3 text-center text-info">
            <Col sm={{ span: 20 }}>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                +
              </Button>
            </Col>
          </Row>
        </Col>
      )}
    </Card.Body>
  );
};

export default EducationCard;
