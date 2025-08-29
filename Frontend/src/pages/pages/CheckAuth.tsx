import { useEffect, type JSX } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout, setAccessToken } from '../../store/auth/authSlice';
import api from '../../api/api';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    async function verify() {
      try {
        const res = await api.get('/refresh', { withCredentials: true });

        if (res.status === 200) {
          const data = res.data;

          // ✅ Update Redux & localStorage with new token
          dispatch(setAccessToken(data.accessToken));

        } else {
          dispatch(logout());
          navigate('/auth/sign-in');
        }
      } catch {
        dispatch(logout());
        navigate('/auth/sign-in');
      }
    }

    verify();
  }, [dispatch, navigate]); // runs when component mounts

  return <>{children}</>;
};

export default CheckAuth;
