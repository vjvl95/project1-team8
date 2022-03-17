import { useState, useEffect } from 'react';
import * as Api from '../../api';
import AwardListItem from './AwardListItem';

const AwardList = ({ isEditing, isEditable, portfolioOwnerId }) => {
  const [awardList, setAwardList] = useState(null);

  useEffect(() => {
    Api.get(`awardlist/${portfolioOwnerId}`).then((res) => {
      const { data } = res;
      if (JSON.stringify(data) !== JSON.stringify(awardList)) {
        setAwardList(data);
      }
    });
  }, [portfolioOwnerId, isEditing, awardList]);

  const awardListArray = awardList?.map((item) => {
    return (
      <AwardListItem
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        isEditable={isEditable}
      />
    );
  });
  return <>{awardListArray}</>;
};

export default AwardList;
