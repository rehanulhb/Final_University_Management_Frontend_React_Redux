import { Table, type TableColumnsType, type TableProps } from 'antd';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import type { TAcademicSemester } from '../../../types/academicManagement.type';

export type TTableData = Pick<
  TAcademicSemester,
  '_id' | 'name' | 'year' | 'startMonth' | 'endMonth'
>;

const AcademicSemester = () => {
  const { data: semesterData } = useGetAllSemestersQuery([{ name: 'year', value: '2026' }]);

  const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    _id,
    name,
    startMonth,
    endMonth,
    year,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      showSorterTooltip: { target: 'full-header' },
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Jim',
          value: 'Jim',
        },
        {
          text: 'Submenu',
          value: 'Submenu',
          children: [
            {
              text: 'Green',
              value: 'Green',
            },
            {
              text: 'Black',
              value: 'Black',
            },
          ],
        },
      ],
    },
    {
      title: 'Year',
      dataIndex: 'year',
    },
    {
      title: 'Start Month',
      dataIndex: 'startMonth',
    },
    {
      title: 'End Month',
      dataIndex: 'endMonth',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log(filters);
  };

  return (
    <Table<TTableData>
      columns={columns}
      dataSource={tableData}
      onChange={onChange}
      showSorterTooltip={{ target: 'sorter-icon' }}
    />
  );
};

export default AcademicSemester;
