import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import { Button, Col, Flex } from 'antd';
import UniSelect from '../../../components/form/UniSelect';

const nameOptions = [
  {
    value: '01',
    label: 'Autumn',
  },
  {
    value: '02',
    label: 'Summer',
  },
  {
    value: '03',
    label: 'Fall',
  },
];

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const semesterData = {
      name: 'something',
      code: 'something',
    };
    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniFrom onSubmit={onSubmit}>
          <UniSelect label="Name" name="name" options={nameOptions} />

          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
