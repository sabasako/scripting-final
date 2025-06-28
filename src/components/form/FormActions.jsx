import { Link } from "react-router";

export default function FormActions({
  backUrl,
  backLabel,
  submitLabel,
  formId,
}) {
  return (
    <div className="form-actions">
      <Link to={backUrl} className="link-secondary">
        {backLabel}
      </Link>
      <button type="submit" form={formId} className="btn btn-primary">
        {submitLabel}
      </button>
    </div>
  );
}
