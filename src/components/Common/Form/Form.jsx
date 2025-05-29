import React, { useContext } from "react";
import { default as RcForm, FieldContext } from "rc-field-form";

import FormItem from "./FormItem";

const Form = ({ children, ...props }) => {
  return <RcForm {...props}>{children}</RcForm>;
};

export const useFormInstance = () => {
  const ctx = useContext(FieldContext);

  return ctx;
};

Form.Item = FormItem;

export default Form;
