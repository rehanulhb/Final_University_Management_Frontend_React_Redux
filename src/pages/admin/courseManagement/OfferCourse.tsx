import { Button, Col, Flex } from 'antd';
import UniFrom from '../../../components/form/UniFrom';
import UniInput from '../../../components/form/UniInput';
import { useGetAcademicFacultiesQuery } from '../../../redux/features/admin/academicManagement.api';
import UniSelectWithWatch from '../../../components/form/UniSelectWithWatch';
import { useState } from 'react';
import type { FieldValues, SubmitHandler } from 'react-hook-form';

const OfferCourse = () => {
  const [id, setId] = useState('');
  console.log('Inside Parent Component', id);

  const { data: academicFacultyData } = useGetAcademicFacultiesQuery(undefined);
  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniFrom onSubmit={onSubmit}>
          <UniSelectWithWatch
            onValueChange={setId}
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <UniInput disabled={!id} type="text" name="test" label="test" />

          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
