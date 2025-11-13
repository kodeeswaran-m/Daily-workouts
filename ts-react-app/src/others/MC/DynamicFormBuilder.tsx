import { useState, type ChangeEvent, type FormEvent } from "react";
import "../styles/DynamicFormBuilder.css";
type FieldType = "text" | "number" | "checkbox";

interface Field {
  id: number;
  label: string;
  type: FieldType;
  value: string | number | boolean;
}

const DynamicFormbuilder = () => {
  const [formFields, setFormFields] = useState<Field[]>([]);

  const handleAddFields = (type: FieldType) => {
    const newField: Field = {
      id: Date.now(),
      label: `${type} field`,
      type: type,
      value: type === "checkbox" ? false : "",
    };
    setFormFields((prev) => [...prev, newField]);
  };
  const handleChange = (id: number, value: string) => {
    setFormFields((prev) =>
      prev.map((ele) => (id === ele.id ? { ...ele, value: value } : ele))
    );
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("formData", formFields);
  };

  return (
    <div>
      <div>
        <button className="btn" onClick={() => handleAddFields("text")}>
          Text
        </button>
        <button className="btn" onClick={() => handleAddFields("number")}>
          Number
        </button>
        <button className="btn" onClick={() => handleAddFields("checkbox")}>
          CheckBox
        </button>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <div>
              <label>{field.label}</label>
              {field.type === "text" && (
                <input
                  type="text"
                  value={field.value as string}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              )}
              {field.type == "number" && (
                <input
                  type="number"
                  value={field.value as number}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              )}
              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  checked={field.value as boolean}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleChange(field.id, e.target.value)
                  }
                />
              )}
            </div>
          ))}
          {formFields.length!==0 && <button type="submit">Submit</button>  }
        </form>
      </div>
    </div>
  );
};
export default DynamicFormbuilder;
