import type { FieldValues, SubmitHandler } from 'react-hook-form';
import UniFrom from '../../../components/form/UniFrom';
import UniInput from '../../../components/form/UniInput';
import { Button, Col, Divider, Row } from 'antd';
import UniSelect from '../../../components/form/UniSelect';
import { bloodGroupOptions, genderOptions } from '../../../constants/global';
import UniDatePicker from '../../../components/form/UniDatePicker';
import {
  useGetAcademicDepartmentsQuery,
  useGetAllSemestersQuery,
} from '../../../redux/features/admin/academicManagement.api';
import { useAddStudentMutation } from '../../../redux/features/admin/userManagement.api';

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
    email: 'rima20@gmail.com',
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

//!This is Only for Development
//! Just for checking
const studentDefaultValues = {
  name: {
    firstName: 'Shahina',
    middleName: 'Akter',
    lastName: 'Rima',
  },
  gender: 'male',

  email: 'rima20@gmail.com',
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
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();

  console.log({ data, error });
  const { data: sData, isLoading: sIsLoading } = useGetAllSemestersQuery(undefined);
  const { data: dData, isLoading: dIsLoading } = useGetAcademicDepartmentsQuery(undefined);

  console.log(sIsLoading);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const departmentOptions = dData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const studentData = {
      password: 'student123',
      student: data,
    };
    console.log(data);

    const formData = new FormData();

    formData.append('data', JSON.stringify(studentData));

    addStudent(formData);

    //! This if for Development
    //! Just for checking
    console.log(Object.fromEntries(formData));
  };
  return (
    <Row>
      <Col span={24}>
        <UniFrom onSubmit={onSubmit} defaultValues={studentDefaultValues}>
          <Divider>Personal Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="name.lastName" label="Last Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect options={genderOptions} name="gender" label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect options={bloodGroupOptions} name="bloodGroup" label="Blood Group" />
            </Col>
          </Row>
          <Divider>Contact Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="contactNo" label="Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="emergencyContactNo" label="Emergency Contact" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="presentAddress" label="Present Address" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="permanentAddress" label="Permanent Address" />
            </Col>
          </Row>
          <Divider>Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.fatherName" label="Father Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.fatherOccupation" label="Father Occupation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.fatherContactNo" label="Father Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.motherName" label="Mother Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.motherOccupation" label="Mother Occupation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="guardian.motherContactNo" label="Mother Contact No" />
            </Col>
          </Row>
          <Divider>Local Guardian</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="localGuardian.name" label="Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="localGuardian.occupation" label="Occupation" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="localGuardian.contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniInput type="text" name="localGuardian.address" label="Address" />
            </Col>
          </Row>
          <Divider>Academic Info</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                options={semesterOptions}
                disabled={sIsLoading}
                name="admissionSemester"
                label="Admission Semester"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UniSelect
                options={departmentOptions}
                disabled={dIsLoading}
                name="admissionSemester"
                label="Admission Department"
              />
            </Col>
          </Row>
          <Button htmlType="submit">Submit</Button>
        </UniFrom>
      </Col>
    </Row>
  );
};

export default CreateStudent;
