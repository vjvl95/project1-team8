import { Card, Row, Button, Col } from "react-bootstrap";
import EducationList from "./EducationList";

const EducationCard = ({ portfolioOwnerId, setIsEditing, isEditable }) => {
  return (
    <Card.Body>
      <EducationList portfolioOwnerId={portfolioOwnerId} />

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
