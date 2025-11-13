import type { FormFieldProps } from "./FormField.types";

const FormField = (props: FormFieldProps) => {
  const { label, name, required } = props;
  switch (props.type) {
    case "text":
    case "number":
    case "email":
    case "password":
    case "date":
    case "time":
    case "datetime-local":
    case "file":
    case "range":
    case "slider":
      return (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            type={props.type === "slider" ? "range" : props.type}
            id={name}
            name={name}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange}
            min={props.min}
            max={props.max}
            required={!!required}
          />
        </div>
      );
    case "textarea":
      return (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <textarea
            id={name}
            name={name}
            placeholder={props.placeholder}
            rows={props.rows}
            cols={props.cols}
            value={props.value}
            onChange={props.onChange}
            required={required}
          />
        </div>
      );
    case "checkbox":
      return (
        <div>
          <input
            type={props.type}
            id={props.name}
            name={props.name}
            checked={props.checked}
            onChange={props.onChange}
            required={required}
          />
          <label htmlFor={props.name}>{label}</label>
        </div>
      );
    case "radio":
      return (
        <div className="form-group">
          <label>{label}</label>
          <div>
            {props.options.map((opt) => (
              <label key={opt.value}>
                <input
                  type={props.type}
                  id={props.name}
                  name={props.name}
                  checked={props.value === opt.value}
                  value={props.value}
                  onChange={props.onChange}
                  required={required}
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>
      );
    case "select":
      return (
        <div className="form-group">
          <label htmlFor={name}>{label}</label>
          <select id={props.name} name={props.name} value={props.value} onChange={props.onChange}>
            <option value={""}>--select an option--</option>
            {props.options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      );

       default:
        return null;
  }
};

export default FormField;
