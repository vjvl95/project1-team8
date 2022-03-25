import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import { UserStateContext, DispatchContext } from '../App';
import SearchBox from '../components/common/SearchBox';
import Comment from './comment/Comment';

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
    sessionStorage.removeItem("userToken");
    // dispatch 함수를 이용해 로그아웃함.
    userDispatch({ type: "LOGOUT" });
    // 기본 페이지로 돌아감.
    navigate("/");
  };

  return (
    <Nav activeKey={location.pathname} style={{backgroundColor:"ivory"}}>
      <Nav.Item className="me-auto">
        <Nav.Link disabled ><h2>안녕하세요, 포트폴리오 공유 서비스입니다.</h2></Nav.Link>
      </Nav.Item>
      {path === 'network' && (
        <Nav.Item>
          <SearchBox></SearchBox>
        </Nav.Item>
      )}
      <Nav.Item>
        <Nav.Link onClick={() => navigate('/')}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item className="mt-2">
        <Nav.Link onClick={() => navigate("/bookmark")}>내 북마크</Nav.Link>
      </Nav.Item>
      <Nav.Item className="mt-2">
        <Nav.Link onClick={() => navigate("/")}>나의 페이지</Nav.Link>
      </Nav.Item>
      <Nav.Item className="mt-2">
        <Nav.Link onClick={() => navigate("/network")}>네트워크</Nav.Link>
      </Nav.Item>
      {isLogin && (
        <>
          <Nav.Item className="mt-2">
            <Nav.Link onClick={logout}>로그아웃</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Comment />
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Header;
