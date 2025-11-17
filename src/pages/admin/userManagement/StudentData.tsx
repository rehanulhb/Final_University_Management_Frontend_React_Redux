import { Button, Pagination, Space, Table, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';
import type { TQueryParam } from '../../../types/global';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';
import type { TStudent } from '../../../types/userManagement.type';
import { Link } from 'react-router-dom';

export type TTableData = Pick<TStudent, 'fullName' | 'id' | 'email' | 'contactNo'>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const meatData = studentData?.meta;

  const tableData = studentData?.data?.map(({ _id, fullName, id, email, contactNo }) => ({
    key: _id,
    fullName,
    id,
    email,
    contactNo,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'fullName',
    },
    {
      title: 'Roll No:',
      key: 'id',
      dataIndex: 'id',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Contact No',
      key: 'contactNo',
      dataIndex: 'contactNo',
    },
    {
      title: 'Action',
      key: 'X',
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item.key}`}>
              <Button>Details</Button>
            </Link>

            <Button>Update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: '1%',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
    if (extra.action === 'filter') {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) => queryParams.push({ name: 'name', value: item }));
      filters.year?.forEach((item) => queryParams.push({ name: 'year', value: item }));

      setParams(queryParams);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        onChange={(value) => setPage(value)}
        pageSize={meatData?.limit}
        total={meatData?.total}
      />
    </>
  );
};

export default StudentData;
