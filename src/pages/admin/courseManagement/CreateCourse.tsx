/* eslint-disable @typescript-eslint/no-unused-vars */
import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import { Button, Col, Flex } from 'antd';
import UniSelect from '../../../components/form/UniSelect';

import { toast } from 'sonner';
// import type { TResponse } from '../../../types/global';

import UniInput from '../../../components/form/UniInput';
import {
  useAddCourseMutation,
  useGetAllCoursesQuery,
} from '../../../redux/features/admin/courseManagement';
import type { TResponse } from '../../../types/global';

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading('Creating....');

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success('Course Created', { id: toastId });
      }
    } catch (err) {
      toast.error('Something went Wrong', { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UniFrom onSubmit={onSubmit}>
          <UniInput type="text" name="title" label="Title" />
          <UniInput type="text" name="prefix" label="Prefix" />
          <UniInput type="text" name="code" label="Code" />
          <UniInput type="text" name="credits" label="Credits" />
          <UniSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="preRequisiteCourses"
          />
          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
