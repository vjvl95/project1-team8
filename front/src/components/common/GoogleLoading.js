import * as Api from '../../api';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../App';
import { useContext } from 'react';

const GoogleLoading = () => {
  const navigate = useNavigate();
  const { userDispatch } = useContext(DispatchContext);

  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');
  const googleLogin = async () => {
    const {
      data: { user },
    } = await Api.post('loading/google', { accessToken });
    const jwtToken = user.token;
    console.log(jwtToken);
    sessionStorage.setItem('userToken', jwtToken);
    userDispatch({
      type: 'LOGIN_SUCCESS',
      payload: user,
    });
    navigate('/', { replace: true });
  };
  googleLogin();

  return <div>로딩중...</div>;
};

export default GoogleLoading;
