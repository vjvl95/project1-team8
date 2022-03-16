import { Card, Row, Button, Col } from 'react-bootstrap';
import AwardList from './AwardList';

function AwardCard({ awardList, setIsEditing, isEditable, isNetwork }) {
  return (
    <>
      <Card.Body>
        <Card.Title>수상이력</Card.Title>
        <AwardList awardList={awardList} isEditable={isEditable} />
        {isEditable && (
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
        )}
      </Card.Body>
    </>
  );
}

export default AwardCard;
