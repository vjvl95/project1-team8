import React, { useState, useEffect } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';
import * as Api from '../../api';
import { Card } from 'react-bootstrap';

function Award({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [awardList, setAwardList] = useState(null);

  useEffect(() => {
    Api.get('awardlist', portfolioOwnerId).then((res) =>
      setAwardList(res.data)
    );
  }, [portfolioOwnerId]);

  return (
    <Card>
      <AwardCard
        awardList={awardList}
        setIsEditing={setIsEditing}
        isEditable={isEditable}
      />
      {isEditing && (
        <AwardEditForm
          awardList={awardList}
          setIsEditing={setIsEditing}
          setAwardList={setAwardList}
          isForListItem={false}
        />
      )}
    </Card>
  );
}

export default Award;
