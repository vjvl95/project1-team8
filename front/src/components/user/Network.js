import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import styles from './Network.module.css';
import { BookmarkListContext } from '../../App';
import * as Api from '../../api';
import UserCard from './UserCard';
import { SearchContext, UserStateContext, DispatchContext } from '../../App';
import UserTable from './UserTable';
function Network() {
  const { setBookmarklist } = useContext(BookmarkListContext);
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

  const [top3, setTop3] = useState([]);

  useEffect(() => {
    if (!userState.user) {
      navigate('/login');
      return;
    }

    async function getUser() {
      const bookmarkTop3 = await Api.get('user/bookmarktop3');
      const new_bookmarklist = await Api.get('user/bookmarklist');
      setBookmarklist(new_bookmarklist.data);
      setTop3(bookmarkTop3.data);
    }

    getUser();
  }, [userState, navigate]);

  useEffect(() => searchInit(), [searchInit]);

  useEffect(() => {
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
  }, [searchState]);

  return (
    <Container fluid>
      <div
        style={{
          backgroundColor: '#F0F0F0',
          opacity: 0.95,
          padding: '30px 0 10px 0',
          margin: '30px 0 120px 0',
          borderRadius: '0px 0px 50px 50px',
          boxShadow:
            'rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        }}
      >
        <UserTable />
      </div>

      <Row xs='auto' className='justify-content-center'>
        {users.map((user) => (
          <UserCard key={user.id} user={user} isNetwork />
        ))}
      </Row>
    </Container>
  );
}

export default Network;
