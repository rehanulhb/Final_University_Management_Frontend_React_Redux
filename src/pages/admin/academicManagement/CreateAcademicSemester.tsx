/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import { Button, Col, Flex } from 'antd';
import UniSelect from '../../../components/form/UniSelect';
import { semesterOptions } from '../../../constants/semester';
import { montOptions } from '../../../constants/global';
import { zodResolver } from '@hookform/resolvers/zod';
import { academicSemesterSchema } from '../../../schemas/academicManagement.schema';
import { useAddAcademicSemesterMutation } from '../../../redux/features/admin/academicManagement.api';
import { toast } from 'sonner';

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

console.log(yearOptions);

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      console.log(semesterData);
      const res = await addAcademicSemester(semesterData);
      console.log(res);
    } catch (err) {
      toast.error('Something went Wrong');
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniFrom onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <UniSelect label="Name" name="name" options={semesterOptions} />
          <UniSelect label="Year" name="year" options={yearOptions} />
          <UniSelect label="Start Month" name="startMonth" options={montOptions} />
          <UniSelect label="End Month" name="endMonth" options={montOptions} />

          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
