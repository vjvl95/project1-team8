import { Card, Row, Button, Col } from "react-bootstrap";
import EducationList from "./EducationList";

const EducationCard = ({
  portfolioOwnerId,
  setIsEditing,
  isEditable,
  educations,
  getEducationList,
}) => {
  return (
    <Card.Body>
      <Card.Title className="mb-3">학력</Card.Title>
      <EducationList
        portfolioOwnerId={portfolioOwnerId}
        isEditable={isEditable}
        educations={educations}
        getEducationList={getEducationList}
      />

      {isEditable && (
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
      )}
    </Card.Body>
  );
};

export default EducationCard;
