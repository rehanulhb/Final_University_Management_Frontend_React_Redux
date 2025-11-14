import { Table, type TableColumnsType, type TableProps } from 'antd';
import { useGetAllSemestersQuery } from '../../../redux/features/admin/academicManagement.api';
import type { TAcademicSemester } from '../../../types/academicManagement.type';
import { useState } from 'react';

export type TTableData = Pick<
  TAcademicSemester,
  '_id' | 'name' | 'year' | 'startMonth' | 'endMonth'
>;

const AcademicSemester = () => {
  const [params, setParams] = useState([]);
  const { data: semesterData } = useGetAllSemestersQuery(params);

  const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    key: _id,
    name,
    startMonth,
    endMonth,
    year,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      filters: [
        {
          text: 'Autumn',
          value: 'Autumn',
        },
        {
          text: 'Summer',
          value: 'Summer',
        },
        {
          text: 'Fall',
          value: 'Fall',
        },
      ],
    },
    {
      title: 'Year',
      key: 'year',
      dataIndex: 'year',
      filters: [
        {
          text: '2025',
          value: '2025',
        },
        {
          text: '2026',
          value: '2026',
        },
        {
          text: '2027',
          value: '2027',
        },
      ],
    },
    {
      title: 'Start Month',
      key: 'startMonth',
      dataIndex: 'startMonth',
    },
    {
      title: 'End Month',
      key: 'endMonth',
      dataIndex: 'endMonth',
    },
  ];

  const onChange: TableProps<TTableData>['onChange'] = (pagination, filters, sorter, extra) => {
    if (extra.action === 'filter') {
      const queryParams = [];

      filters.name?.forEach((item) => queryParams.push({ name: 'name', value: item }));
      filters.year?.forEach((item) => queryParams.push({ name: 'year', value: item }));

      setParams(queryParams);
    }
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
