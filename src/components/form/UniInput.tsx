import { Input } from 'antd';
import { useFormContext } from 'react-hook-form';

const UniInput = ({ type, name, label }) => {
  const { register } = useFormContext();
  return (
    <>
      {label ? label : null}
      <Input type={type} id={name} {...register(name)} />
    </>
  );
};

export default UniInput;
