/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form } from 'antd';
import type { ReactNode } from 'react';
import { FormProvider, useForm, type FieldValues, type SubmitHandler } from 'react-hook-form';

type TFormConfig = {
  defaultValues?: Record<string, any>;
};

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
} & TFormConfig;

const UniFrom = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig['defaultValues'] = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default UniFrom;
