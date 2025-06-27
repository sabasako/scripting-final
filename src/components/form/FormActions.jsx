import { Link } from "react-router";

export default function FormActions({ backUrl, backLabel, submitLabel }) {
  return (
    <div className="form-actions">
      <Link to={backUrl} className="link-secondary">
        {backLabel}
      </Link>
      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </div>
  );
}
