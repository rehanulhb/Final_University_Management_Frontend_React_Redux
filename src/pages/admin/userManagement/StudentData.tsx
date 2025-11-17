import { Button, Space, Table, type TableColumnsType, type TableProps } from 'antd';
import { useState } from 'react';
import type { TQueryParam } from '../../../types/global';
import { useGetAllStudentsQuery } from '../../../redux/features/admin/userManagement.api';
import type { TStudent } from '../../../types/userManagement.type';

export type TTableData = Pick<TStudent, 'name' | 'id'>;

const StudentData = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(3);
  const {
    data: studentData,
    isLoading,
    isFetching,
  } = useGetAllStudentsQuery([
    { name: 'limit', value: 3 },
    { name: 'page', value: page },
    { name: 'sort', value: 'id' },
    ...params,
  ]);

  console.log({ isLoading, isFetching });

  const tableData = studentData?.data?.map(({ _id, fullName, id }) => ({
    key: _id,
    fullName,
    id,
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
      title: 'Action',
      key: 'X',
      render: () => {
        return (
          <Space>
            <Button>Details</Button>
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
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
};

export default StudentData;
