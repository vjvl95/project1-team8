import React, { useState, useEffect } from 'react';
import AwardEditForm from './AwardEditForm';
import AwardCard from './AwardCard';
import * as Api from '../../api';
import { Card } from 'react-bootstrap';

function Award({ portfolioOwnerId, isEditable }) {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    Api.get('users', portfolioOwnerId).then((res) => setUser(res.data));
  }, [portfolioOwnerId]);

  return (
    <Card className='mb-2 ms-3 mr-5' style={{}}>
      <AwardCard
        user={user}
        setIsEditing={setIsEditing}
        isEditable={isEditable}
      />
      {isEditing && (
        <AwardEditForm
          user={user}
          setIsEditing={setIsEditing}
          setUser={setUser}
        />
      )}
    </Card>
  );
}

export default Award;
