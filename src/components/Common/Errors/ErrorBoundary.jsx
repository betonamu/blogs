import { useRouteError } from "react-router-dom";
import NotFound404 from "./NotFound404";
import InternalError500 from "./InternalError500";
import Forbidden403 from "./Forbidden403";

const errorElement = {
  404: NotFound404,
  403: Forbidden403,
  default: InternalError500,
};

function ErrorBoundary() {
  const error = useRouteError();
  const ErrorComponent = errorElement[error?.status] || errorElement.default;

  return <ErrorComponent />;
}

export default ErrorBoundary;
