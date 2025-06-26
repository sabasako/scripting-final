import "./forms.css";

export default function FormSelect({ id, label, register, error, children }) {
  return (
    <div className="form-group select-container">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        {...register(id)}
        className={`form-input ${error ? "input-error" : ""}`}
      >
        {children}
      </select>
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
}
