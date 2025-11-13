import { useState, type FormEvent } from "react";
import FormField from "../DynamicFormField/FormField";
import type { AuthFormProps } from "./AuthForm.types";

const AuthForm = <T extends "login" | "signup">(props: AuthFormProps<T>) => {
  const { onSubmit, mode } = props;

  const [formData, setFormData] = useState(() => {
    if (mode === "login")
      return {
        email: props.email,
        password: props.password,
      };
    else if (mode === "signup")
      return {
        username: props.username,
        email: props.email,
        password: props.password,
      };
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(formData as any);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <FormField
            type="text"
            label="User Name"
            name="username"
            value={formData?.username}
            onChange={handleChange}
          />
        )}
        <FormField
          type="email"
          label="Email"
          name="email"
          value={formData?.email}
          onChange={handleChange}
        />
        <FormField
          type="password"
          label="password"
          name="password"
          value={formData?.password}
          onChange={handleChange}
        />
        <button type="submit">Sumit</button>
      </form>
    </div>
  );
};
export default AuthForm;
