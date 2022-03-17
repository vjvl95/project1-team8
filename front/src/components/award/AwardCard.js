import { Card, Row, Button, Col } from 'react-bootstrap';
import AwardList from './AwardList';

function AwardCard({ isEditing, setIsEditing, isEditable, portfolioOwnerId }) {
  return (
    <>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        <AwardList
          isEditing={isEditing}
          isEditable={isEditable}
          portfolioOwnerId={portfolioOwnerId}
        />
        {isEditable && (
          <Row className='mt-3 text-center text-info'>
            <Col sm={{ span: 20 }}>
              <Button
                variant='primary'
                size='sm'
                onClick={() => setIsEditing((state) => !state)}
              >
                +
              </Button>
            </Col>
          </Row>
        )}
      </Card.Body>
    </>
  );
}

export default AwardCard;
