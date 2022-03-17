import { useState, useEffect } from 'react';
import * as Api from '../../api';
import AwardListItem from './AwardListItem';

const AwardList = ({ isEditable, portfolioOwnerId }) => {
  const [awardList, setAwardList] = useState(null);

  useEffect(() => {
    Api.get(`awardlist/${portfolioOwnerId}`).then((res) =>
      setAwardList(res.data)
    );
  }, [portfolioOwnerId]);

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
