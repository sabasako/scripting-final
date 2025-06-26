import "./forms.css";

export default function FormInput({
  id,
  label,
  register,
  error,
  placeholder,
  type = "text",
}) {
  return (
    <div className="form-group">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={label}
        {...register(id)}
        className={`form-input ${error ? "input-error" : ""}`}
      />
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
}
