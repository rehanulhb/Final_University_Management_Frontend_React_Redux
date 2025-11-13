import { Form, Select } from 'antd';
import { Controller } from 'react-hook-form';

type TUNISelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[];
};

const UniSelect = ({ label, name, options }: TUNISelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field }) => (
        <Form.Item label={label}>
          <Select style={{ width: '100%' }} {...field} options={options} />
        </Form.Item>
      )}
    />
  );
};

export default UniSelect;
