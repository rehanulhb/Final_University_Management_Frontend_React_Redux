import { Button } from 'antd';
import { useForm, useFormContext, type FieldValues } from 'react-hook-form';
import { useLoginMutation } from '../redux/features/auth/authApi';
import { useAppDispatch } from '../redux/hooks';
import { setUser, type TUser } from '../redux/features/auth/authSlice';
import { verifyToken } from '../utils/verifyToken';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import UniFrom from '../components/form/UniFrom';
import UniInput from '../components/form/UniInput';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // const { register, handleSubmit } = useForm({
  //   defaultValues: {
  //     userId: 'A-0001',
  //     password: 'admin123',
  //   },
  // });

  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    // const toastId = toast.loading('Logging in');
    // try {
    //   const userInfo = {
    //     id: data.userId,
    //     password: data.password,
    //   };
    //   const res = await login(userInfo).unwrap();
    //   const user = verifyToken(res.data.accessToken) as TUser;
    //   dispatch(setUser({ user: user, token: res.data.accessToken }));
    //   toast.success('Logged in', { id: toastId, duration: 2000 });
    //   navigate(`/${user.role}/dashboard`);
    // } catch (err) {
    //   toast.error('Something went wrong', { id: toastId, duration: 2000 });
    // }
  };

  return (
    <UniFrom onSubmit={onSubmit}>
      <div>
        <UniInput type="text" name="userId" label="ID:" />
      </div>
      <div>
        <UniInput type="text" name="password" label="Password" />
      </div>
      <Button htmlType="submit">Login</Button>
    </UniFrom>
  );
};

export default Login;
