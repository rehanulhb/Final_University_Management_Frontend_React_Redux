import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import UniInput from '../../../components/form/UniInput';
import { Button } from 'antd';

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <UniFrom onSubmit={onSubmit}>
      <UniInput type="text" name="name" />
      <Button htmlType="submit">Submit</Button>
    </UniFrom>
  );
};

export default CreateAcademicSemester;
