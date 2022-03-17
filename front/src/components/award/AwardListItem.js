// import AwardEditForm from './AwardEditForm';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import AwardEditForm from './AwardEditForm';
import * as Api from '../../api';

const AwardListItem = ({ id, title, description, isEditable }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  useEffect(() => {
    Api.get(`awards/${id}`).then((res) => {
      const { title, description } = res.data;
      if (newTitle !== title || newDescription !== description) {
        setNewTitle(title);
        setNewDescription(description);
      }
    });
  }, [isEditing, id, newDescription, newTitle]);

  return (
    <div>
      {isEditing ? (
        <AwardEditForm
          setIsEditing={setIsEditing}
          isForListItem={true}
          itemId={id}
          itemTitle={newTitle}
          itemDescription={newDescription}
        />
      ) : (
        <div>
          <p>{newTitle}</p>
          <p>{newDescription}</p>
          {isEditable && (
            <Button
              variant='outline-info'
              size='sm'
              onClick={() => {
                setIsEditing(true);
              }}
            >
              편집
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default AwardListItem;
