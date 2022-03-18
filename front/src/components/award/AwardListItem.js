// import AwardEditForm from './AwardEditForm';
import { useEffect, useState } from 'react';
import * as Api from '../../api';
import { Button, Col, Row, Card } from 'react-bootstrap';
import AwardEditForm from './AwardEditForm';

const AwardListItem = ({ id, title, description, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // useEffect(() => {
  //   Api.get(`awards/${id}`).then((res) => {
  //     const { title, description } = res.data;
  //     if (newTitle !== title || newDescription !== description) {
  //       setNewTitle(title);
  //       setNewDescription(description);
  //     }
  //   });
  // }, [isEditing, id, newDescription, newTitle]);

  return (
    <Card.Text>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
          setNewTitle={setNewTitle}
          setNewDescription={setNewDescription}
        />
      ) : (
        <Row className='align-items-center'>
          <Col>
            <span>{newTitle}</span>
            <br />
            <span className='text-muted'>{newDescription}</span>
          </Col>

          {isEditable && (
            <Col className='col-lg-1'>
              <Button
                variant='outline-info'
                size='sm'
                onClick={() => {
                  setIsEditing(true);
                }}
              >
                편집
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Card.Text>
  );
};

export default AwardListItem;
