import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import UniInput from '../../../components/form/UniInput';
import { Button } from 'antd';

const studentDummyData = {
  password: 'student123',
  student: {
    name: {
      firstName: 'Shahina',
      middleName: 'Akter',
      lastName: 'Rima',
    },
    gender: 'male',
    dateOfBirth: '2002-07-15',
    email: 'rima7@gmail.com',
    contactNo: '+1-555-123-4567',
    emergencyContactNo: '+1-555-987-6543',
    bloodGroup: 'O+',
    presentAddress: '123 Maple Street, Springfield, IL 62704',
    permanentAddress: '456 Oak Avenue, Springfield, IL 62701',
    guardian: {
      fatherName: 'Robert Doe',
      fatherOccupation: 'Engineer',
      fatherContactNo: '+1-555-222-3333',
      motherName: 'Linda Doe',
      motherOccupation: 'Teacher',
      motherContactNo: '+1-555-444-5555',
    },
    localGuardian: {
      name: 'Uncle Sam',
      occupation: 'Businessman',
      contactNo: '+1-555-666-7777',
      address: '789 Pine Road, Springfield, IL 62705',
    },
    admissionSemester: '690522c1f0f8b6c53f63657c',
    academicDepartment: '6905219ff0f8b6c53f636576',
  },
};

const CreateStudent = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    // console.log(data);

    const formData = new FormData();

    formData.append('data', JSON.stringify(data));

    //! This if for Development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <UniFrom onSubmit={onSubmit}>
      <UniInput type="text" name="name" label="Name" />
      <Button htmlType="submit">Submit</Button>
    </UniFrom>
  );
};

export default CreateStudent;
