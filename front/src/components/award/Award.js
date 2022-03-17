import React, { useState, useEffect } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';
import { Card } from 'react-bootstrap';

function Award({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card>
      <AwardCard
        setIsEditing={setIsEditing}
        isEditable={isEditable}
        portfolioOwnerId={portfolioOwnerId}
      />
      {isEditing && (
        <AwardEditForm
          setIsEditing={setIsEditing}
          isForListItem={false}
          portfolioOwnerId={portfolioOwnerId}
        />
      )}
    </Card>
  );
}

export default Award;
