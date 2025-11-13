import { useState, type ChangeEvent, type FormEvent } from "react";
import type { FormFieldProps } from "./FormField.types";
import FormField from "./FormField";
import "./FormStyles.css"
const formFields: FormFieldProps[] = [
  {
    type: "text",
    name: "username",
    label: "Username",
    placeholder: "Enter your name",
    required: true,
    value: "",
    onChange: () => {},
  },
  {
    type: "email",
    name: "email",
    label: "Email",
    placeholder: "Enter your email..",
    required: true,
    value: "",
    onChange: () => {},
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Enter your password.",
    required: true,
    value: "",
    onChange: () => {},
  },
  {
    type: "number",
    name: "age",
    label: "Age",
    placeholder: "Enter your age..",
    min: 20,
    max: 65,
    value: "",
    onChange: () => {},
  },
  {
    type: "date",
    name: "dob",
    label: "DOB",
    value: "",
    onChange: () => {},
  },
  {
    type: "select",
    name: "domain",
    label: "Domain",
    options: [
      { label: "JLM", value: "jlm" },
      { label: "Insurance", value: "insurance" },
    ],
    value: "",
    onChange: () => {},
  },
  {
    type: "textarea",
    name: "bio",
    label: "Bio",
    placeholder: "Enter your Bio",
    value: "",
    onChange: () => {},
  },
];

interface FormData {
  username: string;
  email: string;
  password: string;
  age: string;
  dob: string;
  domain: string;
  bio: string;
}

const UserDetailForm = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    age: "",
    dob: "",
    domain: "",
    bio: "",
  });

  const handleChange = (e: ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("formData",formData );
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <FormField
            key={field.name}
            {...field}
            value={formData[field.name as keyof typeof formData]}
            onChange={handleChange}
          />
        ))}
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default UserDetailForm;
