import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { UserStateContext, DispatchContext } from '../App';
import SearchBox from '../components/common/SearchBox';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const [path, setPath] = useState('');
  useEffect(() => setPath(location.pathname.substring(1)), [location]);

  const userState = useContext(UserStateContext);
  const { userDispatch } = useContext(DispatchContext);

  // 전역상태에서 user가 null이 아니라면 로그인 성공 상태임.
  const isLogin = !!userState.user;

  // 로그아웃 클릭 시 실행되는 함수
  const logout = () => {
    // sessionStorage 에 저장했던 JWT 토큰을 삭제함.
    sessionStorage.removeItem('userToken');
    userDispatch({ type: 'LOGOUT' });
    navigate('/');
  };

  return (
    <Nav activeKey={location.pathname}>
      <Nav.Item className='me-auto mb-5'>
        <Nav.Link disabled>안녕하세요, 포트폴리오 공유 서비스입니다.</Nav.Link>
      </Nav.Item>
      {path === 'network' && (
        <Nav.Item>
          <SearchBox></SearchBox>
        </Nav.Item>
      )}
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/network')}>네트워크</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <Nav.Item>
          <Nav.Link onClick={logout}>로그아웃</Nav.Link>
        </Nav.Item>
      )}
    </Nav>
  );
}

export default Header;
