import * as React from "react";

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className="flash-error">{message}</div>
);

export default ErrorMessage;
