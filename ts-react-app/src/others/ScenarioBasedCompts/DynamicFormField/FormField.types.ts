import type { ChangeEvent } from "react";

export type BaseFieldProps = {
  label: string;
  name: string;
  value: any;
  onChange: (e: ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => void;
  required?: boolean;
};

type TextLikeProps = BaseFieldProps & {
  type:
    | "text"
    | "number"
    | "email"
    | "password"
    | "date"
    | "time"
    | "datetime-local"
    | "file"
    | "range"
    | "slider";
  placeholder?: string;
  min?: number;
  max?: number;
};

type TextAreaProps = BaseFieldProps & {
  type: "textarea";
  placeholder?: string;
  rows?: number;
  cols?: number;
};

type CheckBoxProps = BaseFieldProps & {
  type: "checkbox";
  checked: boolean;
};

type RadioButtonProps = BaseFieldProps & {
  type: "radio";
  options: { label: string; value: string }[];
};

type SelectProps = BaseFieldProps & {
  type: "select";
  options: { label: string; value: string }[];
};

export type FormFieldProps =
  | TextLikeProps
  | TextAreaProps
  | CheckBoxProps
  | RadioButtonProps
  | SelectProps;
