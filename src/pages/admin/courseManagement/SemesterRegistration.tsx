/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import { Button, Col, Flex } from 'antd';
import UniSelect from '../../../components/form/UniSelect';
import { semesterStatusOptions } from '../../../constants/semester';
import { toast } from 'sonner';
// import type { TResponse } from '../../../types/global';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import UniDatePicker from '../../../components/form/UniDatePicker';
import UniInput from '../../../components/form/UniInput';
import { useAddRegisteredSemesterMutation } from '../../../redux/features/admin/courseManagement';
import type { TResponse } from '../../../types/global';

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([{ name: 'sort', value: 'year' }]);
  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating....');

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };

    console.log(semesterData);

    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Semester Created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went Wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniFrom onSubmit={onSubmit}>
          <UniSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />
          <UniSelect label="status" name="status" options={semesterStatusOptions} />

          <UniDatePicker label="Start Date" name="startDate" />
          <UniDatePicker label="End Date" name="endDate" />

          <UniInput type="text" name="minCredit" label="Min Credit" />
          <UniInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
