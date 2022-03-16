import { useState } from 'react';
import { Button } from 'react-bootstrap';
import AwardEditForm from './AwardEditForm';

const AwardList = ({ isEditable }) => {
  const test = [1, 2, 3, 4];
  const [isEditing, setIsEditing] = useState(false);

  const awardListItem = test.map((item) => {
    return (
      <li key={item}>
        {isEditing ? (
          <AwardEditForm setIsEditing={setIsEditing} />
        ) : (
          <>
            {item}
            {isEditable && (
              <Button
                variant='outline-info'
                size='sm'
                onClick={() => setIsEditing(true)}
              >
                편집
              </Button>
            )}
          </>
        )}
      </li>
    );
  });
  return <>{awardListItem}</>;
};

export default AwardList;
