import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import * as Api from '../../api';
import UserCard from './UserCard';
import { SearchContext, UserStateContext, DispatchContext } from '../../App';

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const searchState = useContext(SearchContext);
  const { searchDispatch } = useContext(DispatchContext);

  const [users, setUsers] = useState([]);
  const searchInit = () => {
    searchState.search !== '' &&
      searchDispatch({
        type: 'DEFAULT',
      });
  };

  useEffect(() => {
    // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
    if (!userState.user) {
      navigate('/login');
      return;
    }
    if (searchState.category === 'all' && searchState.search === '') {
      Api.get('userlist').then((res) => setUsers(res.data));
    } else {
      Api.get(
        'userlist',
        `search?searchType=${searchState.category}&searchWord=${searchState.search}`
      )
        .then((res) => setUsers(res.data))
        .catch((e) =>
          alert(`"${searchState.search}"에 해당하는 검색 결과가 없습니다.  `)
        );
    }
  }, [userState, navigate, searchState]);

  useEffect(() => searchInit(), []);

  return (
    <Container fluid>
      <Row xs='auto' className='justify-content-center'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
