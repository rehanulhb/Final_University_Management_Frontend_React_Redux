import { Button, Table, type TableColumnsType, type TableProps } from 'antd';

import type { TAcademicSemester } from '../../../types/academicManagement.type';
import { useGetAllRegisteredSemestersQuery } from '../../../redux/features/admin/courseManagement';

export type TTableData = Pick<TAcademicSemester, 'name' | 'year' | 'startMonth' | 'endMonth'>;

const RegisteredSemesters = () => {
  //   const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllRegisteredSemestersQuery(undefined);

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, startDate, endDate, status }) => ({
      key: _id,
      name: `${academicSemester.name} ${academicSemester.year}`,
      startDate,
      endDate,
      status,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
    },
    {
      title: 'Action',
      key: 'X',
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  //   const onChange: TableProps<TTableData>['onChange'] = (_pagination, filters, _sorter, extra) => {
  //     if (extra.action === 'filter') {
  //       const queryParams: TQueryParam[] = [];

  //       setParams(queryParams);
  //     }
  //   };

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      //   onChange={onChange}
      //   showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
};

export default RegisteredSemesters;
