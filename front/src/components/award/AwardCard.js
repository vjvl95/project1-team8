import { useNavigate } from 'react-router-dom';
import { Card, Row, Button, Col } from 'react-bootstrap';

function AwardCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  return (
    <>
      <Card.Body>
        <Row className='justify-content-md-center'>수상이력</Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className='mb-2 text-muted'>{user?.email}</Card.Subtitle>
        {isEditable && (
          <Col>
            <Row className='mt-3 text-center text-info'>
              <Col sm={{ span: 20 }}>
                <Button
                  variant='primary'
                  size='sm'
                  onClick={() => setIsEditing(true)}
                >
                  +
                </Button>
              </Col>
            </Row>
          </Col>
        )}
      </Card.Body>
    </>
  );
}

export default AwardCard;
